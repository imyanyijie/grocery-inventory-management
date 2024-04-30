const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const multer = require("multer");

const upload = multer({dest:"public/images/"})
const Item = require("../models/item");
const Category = require("../models/category");
const { DateTime } = require("luxon");

exports.item_list = asyncHandler(async (req, res, next) => {
    const items = await Item.find().exec();
    res.render("item_list",{
        title: "Item List",
        items: items,
    });
});

exports.item_detail = asyncHandler(async (req, res, next) =>{
    const item = await Item.findById(req.params.id);
    console.log(item.img_path);
    res.render("item_detail", {
        title: "Item detail",
        item: item,
    });
});

exports.item_create_get = asyncHandler(async (req, res, next) =>{
    const categories = await Category.find().exec();
    for(cat of categories){
        console.log(cat.name);
    }
    console.log(undefined === typeof item);
    res.render("item_form",{
        title: "Create Item",
        categories: categories,
    });
});

exports.item_create_post =[
    (req, res, next) => {
        if (!Array.isArray(req.body.item_category)) {
          req.body.item_category =
            typeof req.body.item_category === "undefined" ? [] : [req.body.item_category];
        }
        next();
      },
    upload.single('itemImg'),
    body("item_name", "Item quantity must not be empty")
        .trim()
        .isLength({min:1})
        .escape()
        .isAlphanumeric()
        .withMessage("Name should be alphanumeric"),
    body("item_description")
        .trim()
        .isLength({min:3})
        .escape(),
    body("item_quantity", "Item quantity must not be empty")
        .trim()
        .escape(),
        asyncHandler(async (req, res, next) =>{
            const error = validationResult(req);
            const item = new Item ({
                name: req.body.item_name,
                description: req.body.item_description, 
                quantity: req.body.item_quantity, 
                price: req.body.item_price, 
                img_path:req.file.path,
                category: req.body.genre,
            });
            if(!error.isEmpty()){
                const categories = await Category.find().exec();
                res.render("item_form",{
                    title: "Create Item",
                    categories: categories,
                });
            }
            else{
                await item.save();
                res.redirect(item.url)
            }
        })
    ];

exports.item_update_get = asyncHandler(async (req, res, next) =>{
    const [item,categories] = await Promise.all([
        Item.findById(req.params.id).exec(),
        Category.find().exec(),
    ]);
    if(item === null){
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
    }
    res.render("item_form",{
        title: "Update Item", 
        item: item, 
        categories: categories,
});
});

exports.item_update_post = [
    (req, res, next) => {
        if (!Array.isArray(req.body.item_category)) {
          req.body.item_category =
            typeof req.body.item_category === "undefined" ? [] : [req.body.item_category];
        }
        next();
      },
      upload.single('itemImg'),
    body("item_name", "Item quantity must not be empty")
        .trim()
        .isLength({min:1})
        .escape()
        .isAlphanumeric()
        .withMessage("Name should be alphanumeric"),
    body("item_description")
        .trim()
        .isLength({min:3})
        .escape(),
    body("item_quantity", "Item quantity must not be empty")
        .trim()
        .escape(),
    
        asyncHandler(async (req, res, next) =>{
            const error = validationResult(req);
            const item = new Item ({
                _id:req.params.id,
                name: req.body.item_name,
                description: req.body.item_description, 
                quantity: req.body.item_quantity, 
                price: req.body.item_price, 
                img_path:req.file.path,
                category: req.body.genre,
            });
            if(!error.isEmpty()){
                const categories = await Category.find().exec();
                res.render("item_form",{
                    title: "Create Item",
                    categories: categories,
                });
            }
            else{
                await Item.findByIdAndUpdate(req.params.id,item);
                res.redirect(item.url)
            }
        })
    ];

exports.item_delete_get = asyncHandler(async (req, res, next) =>{
    const item = await Item.findById(req.params.id);
    if(item === null){
        console.log("No item found")
        res.redirect("/item")
    }
    res.render("item_delete",{
        title: "Delete Item",
        item:item,
    });
});

exports.item_delete_post = asyncHandler(async (req, res, next) =>{
    await Item.findByIdAndDelete(req.body.itemid);
    res.redirect("/item");
});