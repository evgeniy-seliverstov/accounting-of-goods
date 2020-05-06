const ShelfDao = require('../dao/ShelfDao');

class ShelfController {
  async get(req, res) {
      try {
        const shelfs = await ShelfDao.get();
        res.json(shelfs);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
      }
  }

  async getById(req, res) {
    try {
      const result = await ShelfDao.getById(req.params.id);
      if (result.length) {
        let { id, count } = result[0];
        res.json({ success: true, shelf: { id, count }});
      } else {
        return res.status(404).json({ error: 'Полка не найдена!' });
      }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
    }
  }

  async getCountOfGoods(req, res) {
    try {
      const result = await ShelfDao.getCountOfGoods();
      if (result.length) {
        res.json(result);
      } else {
        return res.status(404).json({ error: 'Полка не найдена!' });
      }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
    }
  }

  async add(req, res) {
    if (!req.body.count) {
      return res.status(400).json({ error: 'Недостаточно параметров!' });
    }

    if (req.body.count <= 0) {
      return res.status(400).json({ error: 'Количество товара на полке должно быть больше 0!' });
    }

    try {
      const { affectedRows, insertId } = await ShelfDao.add(req.body.count);
      if (!affectedRows) {
        return res.status(400).json({ error: 'Не удалось добавить полку, обновите страницу и попробуйте ещё раз!' });
      }
      res.json({ success: true, id: insertId, message: "Полка успешно добавлена" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
    }
  }

  async remove(req, res) {
    try {
        const result = await ShelfDao.delete(req.params.id);
        if (!result.affectedRows) {
          return res.status(400).json({ error: 'Полка не найдена!' });
        }
        res.json({ success: true, message: 'Полка успешно удалена' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
    }
  }

  async update(req, res) {
    if (!req.body.count) {
      return res.status(400).json({ error: 'Недостаточно параметров!' });
    }

    if (req.body.count <= 0) {
      return res.status(400).json({ error: 'Количество товара на полке должно быть больше 0!' });
    }
    
    try {
      const result = await ShelfDao.update(req.body.count, req.params.id);
      if (!result.affectedRows) {
        return res.status(400).json({ error: 'Не удалось изменить полку, обновите страницу и попробуйте ещё раз!' });
      }
      res.json({ success: true, message: "Полка успешно изменена" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
    }  
  }
}

module.exports = new ShelfController();
