const TypeDao = require('../dao/TypeDao');

class TypeController {
  async get(req, res) {
      try {
        const types = await TypeDao.get();
        res.json(types);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
      }
  }

  async getById(req, res) {
    try {
      const result = await TypeDao.getById(req.params.id);
      if (result.length) {
        res.json({ success: true, type: { ...result[0] }});
      } else {
        return res.status(404).json({ error: 'Вид товара не найдена!' });
      }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
    }
  }

  async add(req, res) {
    const { name, supplier_id } = req.body;

    if (!name || !supplier_id) {
      return res.status(400).json({ error: 'Недостаточно параметров!' });
    }

    try {
      const { affectedRows, insertId } = await TypeDao.add(name, supplier_id);
      if (!affectedRows) {
        return res.status(400).json({ error: 'Не удалось добавить вид товара, обновите страницу и попробуйте ещё раз!' });
      }
      res.json({ success: true, id: insertId, message: "Вид товара успешно добавлен" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
    }
  }

  async remove(req, res) {
    try {
        const result = await TypeDao.delete(req.params.id);
        if (!result.affectedRows) {
          return res.status(400).json({ error: 'Вид товара не найден!' });
        }
        res.json({ success: true, message: 'Вид товара успешно удален' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
    }
  }

  async update(req, res) {
    const { name, supplier_id } = req.body;
    
    if (!name || !supplier_id) {
      return res.status(400).json({ error: 'Недостаточно параметров!' });
    }
    
    try {
      const result = await TypeDao.update(name, supplier_id, req.params.id);
      if (!result.affectedRows) {
        return res.status(400).json({ error: 'Не удалось изменить вид товара, обновите страницу и попробуйте ещё раз!' });
      }
      res.json({ success: true, message: "Вид товара успешно изменен" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
    }  
  }
}

module.exports = new TypeController();
