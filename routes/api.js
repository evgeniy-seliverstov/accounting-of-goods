const express = require('express');

const ShelfController = require('../controllers/ShelfController');
const SupplierController = require('../controllers/SupplierController');
const TypeController = require('../controllers/TypeController');
const GoodController = require('../controllers/GoodController');
const OrderController = require('../controllers/OrderController');

const router = express.Router();

router.get('/shelf', ShelfController.getCountOfGoods);
router.get('/shelf/:id', ShelfController.getById);
router.post('/shelf', ShelfController.add);
router.delete('/shelf/:id', ShelfController.remove);
router.put('/shelf/:id', ShelfController.update);

router.get('/supplier', SupplierController.get);
router.get('/supplier/:id', SupplierController.getById);
router.post('/supplier', SupplierController.add);
router.delete('/supplier/:id', SupplierController.remove);
router.put('/supplier/:id', SupplierController.update);

router.get('/type', TypeController.get);
router.get('/type/:id', TypeController.getById);
router.post('/type', TypeController.add);
router.delete('/type/:id', TypeController.remove);
router.put('/type/:id', TypeController.update);

router.get('/good', GoodController.get);
router.get('/good/:id', GoodController.getById);
router.post('/good', GoodController.add);
router.delete('/good/:id', GoodController.remove);
router.put('/good/:id', GoodController.update);

router.get('/order', OrderController.get);
router.post('/order', OrderController.add);
router.delete('/order/:id', OrderController.remove);

module.exports = router;
