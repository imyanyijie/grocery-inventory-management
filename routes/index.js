var express = require('express');
var router = express.Router();
const Item = require("../models/item");
const Category = require("../models/category");

const catagoryController = require('../controllers/categoryController');
const itemController = require('../controllers/itemController');

/* GET home page. */
router.get('/', itemController.index);

//category routers//
router.get("/category/create", catagoryController.category_create_get);

router.post("/category/create", catagoryController.category_create_post);

router.get("/category/:id/update", catagoryController.category_update_get);

router.post("/category/:id/update", catagoryController.category_update_post);

router.get("/category/:id/delete", catagoryController.category_delete_get);

router.post("/category/:id/delete", catagoryController.category_delete_post);

router.get("/category/:id", catagoryController.category_detail);

router.get("/category", catagoryController.category_list);

//item routers//
router.get("/item/create",itemController.item_create_get);

router.post("/item/create", itemController.item_create_post);

router.get("/item/:id/update", itemController.item_update_get);

router.post("/item/:id/update", itemController.item_update_post);

router.get("/item/:id/delete", itemController.item_delete_get);

router.post("/item/:id/delete", itemController.item_delete_post);

router.get("/item/:id", itemController.item_detail);

router.get("/item", itemController.item_list);

module.exports = router;
