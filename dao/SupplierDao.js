const db = require('../core/db');

class ShelfDao {
    async get() {
      try {
          const [shelfs] = await db.query('SELECT * FROM supplier WHERE active = "Y"');
          return shelfs;
      } catch (error) {
          console.error(error);
          throw error;
      }
    }

    async add(name, address, phone) {
        try {
            const [result] = await db.query('INSERT INTO supplier (name, address, phone) values (?, ?, ?)', [name, address, phone]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const [result] = await db.query('UPDATE supplier SET active = "N" WHERE id = ?', [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const [result] = await db.query('SELECT * FROM supplier WHERE id = ?', [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(name, address, phone, id) {
        try {
            const [result] = await db.query('UPDATE supplier SET name = ?, address = ?, phone = ? WHERE active = "Y" AND id = ?', [name, address, phone, id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = new ShelfDao();
