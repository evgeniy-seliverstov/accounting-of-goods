const SupplierDao = require('../dao/SupplierDao');

class SupplierController {
  async get(req, res) {
      try {
        const suppliers = await SupplierDao.get();
        res.json(suppliers);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
      }
  }

  async getById(req, res) {
    try {
      const result = await SupplierDao.getById(req.params.id);
      if (result.length) {
        res.json({ success: true, supplier: { ...result[0] }});
      } else {
        return res.status(404).json({ error: 'Поставщик не найден!' });
      }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
    }
  }

  async add(req, res) {
    const { name, address, phone } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Недостаточно параметров!' });
    }

    try {
      const { affectedRows, insertId } = await SupplierDao.add(name, address, phone);
      if (!affectedRows) {
        return res.status(400).json({ error: 'Не удалось добавить поставщика, обновите страницу и попробуйте ещё раз!' });
      }
      res.json({ success: true, id: insertId, message: "Поставщик успешно добавлен" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
    }
  }

  async remove(req, res) {
    try {
        const result = await SupplierDao.delete(req.params.id);
        if (!result.affectedRows) {
          return res.status(400).json({ error: 'Поставщик не найден!' });
        }
        res.json({ success: true, message: 'Поставщик успешно удален' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
    }
  }

  async update(req, res) {
    const { name, address, phone } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Недостаточно параметров!' });
    }
    
    try {
      const result = await SupplierDao.update(name, address, phone, req.params.id);
      if (!result.affectedRows) {
        return res.status(400).json({ error: 'Не удалось изменить поставщика, обновите страницу и попробуйте ещё раз!' });
      }
      res.json({ success: true, message: "Поставщик успешно изменен" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
    }  
  }
}

module.exports = new SupplierController();
