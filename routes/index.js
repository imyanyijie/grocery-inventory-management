var express = require('express');
var router = express.Router();

const catagoryController = require('../controllers/categoryController');
const itemController = require('../controllers/itemController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Store Inventory Manegement System' });
});

// //category routers//
// router.get("/category", catagoryController.category_list);

// router.get("/category/:id", catagoryController.category_detail);

// router.get("/category/create",catagoryController.category_create_get);

// router.post("/category/create", catagoryController.category_create_post);

// router.get("/category/:id/update", catagoryController.category_update_get);

// router.post("/category/:id/update", catagoryController.category_update_post);

// router.get("/category/:id/delete", catagoryController.category_delete_get);

// router.post("/category/:id/delete", catagoryController.category_delete_post);


// //item routers//
// router.get("/item", itemController.item_list);

// router.get("/item/:id", itemController.item_detail);

// router.get("/item/create",itemController.item_create_get);

// router.post("/item/create", itemController.item_create_post);

// router.get("/item/:id/update", itemController.item_update_get);

// router.post("/item/:id/update", itemController.item_update_post);

// router.get("/item/:id/delete", itemController.item_delete_get);

// router.post("/category/:id/delete", catagoryController.item_delete_post);

module.exports = router;
