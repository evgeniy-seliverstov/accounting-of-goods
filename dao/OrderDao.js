const db = require('../core/db');

class OrderDao {
    async get() {
      try {
          const [orders] = await db.query('SELECT order_good.id, order_good.order_id, orders.date, order_good.active, type.name, order_good.count FROM order_good LEFT JOIN orders ON order_good.order_id = orders.id LEFT JOIN type ON type.id = order_good.type_id WHERE orders.active = "Y" AND order_good.active="Y" AND type.active="Y"');
          return orders;
      } catch (error) {
          console.error(error);
          throw error;
      }
    }

    async add(goods) {
      try {
        const [result] = await db.query('INSERT INTO orders (active) values ("Y")');
        goods.forEach(val => {
          this.addOne(result.insertId, val.type_id, val.count);
        });
        return result;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    async addOne(order_id, type_id, count) {
      try {
        const [result] = await db.query('INSERT INTO order_good (order_id, type_id, count) values (?, ?, ?)', [order_id, type_id, count]);
        return result;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    async delete(id) {
      try {
        const [result] = await db.query('UPDATE orders SET active = "N" WHERE id = ?', [id]);
        return result;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
}

module.exports = new OrderDao();
