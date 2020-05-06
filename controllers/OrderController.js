const OrderDao = require('../dao/OrderDao');

class OrderController {
  async get(req, res) {
      try {
        const orders = await OrderDao.get();
        const moment = require('moment');
        let result = [];

        orders.forEach(val => {
          const order = result.find(el => el.id == val.order_id);
          if (order) {
            order.goods.push({ id: val.id, name: val.name, count: val.count });
          } else {
            result.push({
              id: val.order_id,
              date: moment(val.date).format('DD.MM.YYYY HH:MM'),
              goods: [{ id: val.id, name: val.name, count: val.count }]
            });
          }
        });

        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
      }
  }

  async add(req, res) {
    if (!req.body.goods) {
      return res.status(400).json({ error: 'Недостаточно параметров!' });
    }

    try {
      const { affectedRows, insertId } = await OrderDao.add(req.body.goods);
      if (!affectedRows) {
        return res.status(400).json({ error: 'Не удалось оформить заказ, обновите страницу и попробуйте ещё раз!' });
      }
      res.json({ success: true, id: insertId, message: "Заказ успешно оформлен" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
    }
  }

  async remove(req, res) {
    try {
        const result = await OrderDao.delete(req.params.id);
        if (!result.affectedRows) {
          return res.status(400).json({ error: 'Заказ не найден!' });
        }
        res.json({ success: true, message: 'Заказ успешно удален' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
    }
  }
}

module.exports = new OrderController();
