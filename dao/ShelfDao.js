const db = require('../core/db');

class ShelfDao {
    async get() {
      try {
          const [shelfs] = await db.query('SELECT * FROM shelf WHERE active = "Y"');
          return shelfs;
      } catch (error) {
          console.error(error);
          throw error;
      }
    }

    async add(count) {
        try {
            const [result] = await db.query('INSERT INTO shelf (count) values (?)', [count]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const [result] = await db.query('UPDATE shelf SET active = "N" WHERE id = ?', [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const [result] = await db.query('SELECT * FROM shelf WHERE active = "Y" AND  id = ?', [id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(count, id) {
        try {
            const [result] = await db.query('UPDATE shelf SET count = ? WHERE id = ?', [count, id]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getCountOfGoods() {
      try {
        const [result] = await db.query('SELECT shelf.id, shelf.count, (select sum(good.number) from good where good.shelf_id = shelf.id and (good.active = "Y" OR good.active IS NULL)) as number from shelf where shelf.active = "Y"');
        return result;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
}

module.exports = new ShelfDao();
