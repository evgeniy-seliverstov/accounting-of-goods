const db = require('../core/db');

class GoodDao {
    async get() {
      try {
        const [types] = await db.query('SELECT good.id, good.type_id, good.shelf_id, good.number, good.active, shelf.count AS shelf_count, shelf.active AS shelf_active, type.name AS type_name, type.active AS type_active, type.supplier_id as type_supplier_id FROM good LEFT JOIN shelf ON good.shelf_id = shelf.id LEFT JOIN type ON good.type_id = type.id JOIN supplier ON type.supplier_id = supplier.id WHERE good.active = "Y" AND shelf.active="Y" AND type.active="Y" AND supplier.active="Y"');
        return types;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    async getBySupplier(id) {
      try {
        const [types] = await db.query('SELECT good.id, good.type_id, good.shelf_id, good.number, good.active, shelf.count AS shelf_count, shelf.active AS shelf_active, type.name AS type_name, type.active AS type_active, type.supplier_id as type_supplier_id FROM good LEFT JOIN shelf ON good.shelf_id = shelf.id LEFT JOIN type ON good.type_id = type.id JOIN supplier ON type.supplier_id = supplier.id WHERE good.active = "Y" AND shelf.active="Y" AND type.active="Y" AND supplier.active="Y" AND supplier.id = ?', [id]);
        return types;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    async add(type_id, number, shelf_id) {
      try {
        const [result] = await db.query('INSERT INTO good (type_id, number, shelf_id) values (?, ?, ?)', [type_id, number, shelf_id]);
        return result;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    async delete(id) {
      try {
        const [result] = await db.query('UPDATE good SET active = "N" WHERE id = ?', [id]);
        return result;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    async getById(id) {
      try {
        const [result] = await db.query('SELECT good.id, good.type_id, good.shelf_id, good.number, good.active, shelf.count AS shelf_count, shelf.active AS shelf_active, type.name AS type_name, type.active AS type_active, type.supplier_id as type_supplier_id FROM good LEFT JOIN shelf ON good.shelf_id = shelf.id LEFT JOIN type ON good.type_id = type.id WHERE good.active = "Y" AND good.id = ?', [id]);
        return result;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    async update(type_id, number, shelf_id, id) {
      try {
        const [result] = await db.query('UPDATE good SET type_id = ?, number = ?, shelf_id = ? WHERE id = ?', [type_id, number, shelf_id, id]);
        return result;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
}

module.exports = new GoodDao();
