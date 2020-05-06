const GoodDao = require('../dao/GoodDao');

class GoodController {
  async get(req, res) {
      try {
        const goods = await GoodDao.get();
        res.json(goods);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
      }
  }

  async getById(req, res) {
    try {
      const result = await GoodDao.getById(req.params.id);
      if (result.length) {
        res.json({ success: true, good: { ...result[0] }});
      } else {
        return res.status(404).json({ error: 'Товар не найден!' });
      }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
    }
  }

  async getBySupplier(req, res) {
    try {
      const result = await GoodDao.getById(req.params.id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
    }
  }

  async add(req, res) {
    const { type_id, number, shelf_id } = req.body;

    if (!type_id || !number || !shelf_id) {
      return res.status(400).json({ error: 'Недостаточно параметров!' });
    }

    try {
      const { affectedRows, insertId } = await GoodDao.add(type_id, number, shelf_id);
      if (!affectedRows) {
        return res.status(400).json({ error: 'Не удалось добавить товар, обновите страницу и попробуйте ещё раз!' });
      }
      res.json({ success: true, id: insertId, message: "Товар успешно добавлен" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
    }
  }

  async remove(req, res) {
    try {
        const result = await GoodDao.delete(req.params.id);
        if (!result.affectedRows) {
          return res.status(400).json({ error: 'Товар не найден!' });
        }
        res.json({ success: true, message: 'Товар успешно удален' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
    }
  }

  async update(req, res) {
    const { type_id, number, shelf_id } = req.body;

    if (!type_id || !number || !shelf_id) {
      return res.status(400).json({ error: 'Недостаточно параметров!' });
    }
    
    try {
      const result = await GoodDao.update(type_id, number, shelf_id, req.params.id);
      if (!result.affectedRows) {
        return res.status(400).json({ error: 'Не удалось изменить товар, обновите страницу и попробуйте ещё раз!' });
      }
      res.json({ success: true, message: "Товар успешно изменен" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
    }  
  }
}

module.exports = new GoodController();
