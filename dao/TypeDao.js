const db = require('../core/db');

class TypeDao {
    async get() {
      try {
          const [types] = await db.query('SELECT type.id, type.name, type.supplier_id, supplier.name AS supplier_name, supplier.address AS supplier_address, supplier.phone AS supplier_phone, supplier.active AS supplier_active, type.active FROM type LEFT JOIN supplier ON type.supplier_id = supplier.id WHERE type.active = "Y" AND supplier.active = "Y"');
          return types;
      } catch (error) {
          console.error(error);
          throw error;
      }
    }

    async add(name, supplier_id) {
        try {
            const [result] = await db.query('INSERT INTO type (name, supplier_id) values (?, ?)', [name, supplier_id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const [result] = await db.query('UPDATE type SET active = "N" WHERE id = ?', [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const [result] = await db.query('SELECT type.id, type.name, type.supplier_id, supplier.name AS supplier_name, supplier.address AS supplier_address, supplier.phone AS supplier_phone, supplier.active AS supplier_active, type.active FROM type LEFT JOIN supplier ON type.supplier_id = supplier.id WHERE type.active = "Y" AND supplier.active = "Y" type.id = ?', [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(name, supplier_id, id) {
        try {
            const [result] = await db.query('UPDATE type SET name = ?, supplier_id = ? WHERE id = ?', [name, supplier_id, id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = new TypeDao();
