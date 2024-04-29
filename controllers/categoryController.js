const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Category = require("../models/category");
const Item = require("../models/item");

exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategory = await Category.find().exec();
    res.render("category_list",{
        title:"Category List",
        category_list:allCategory,
    });
});

exports.category_detail = asyncHandler(async (req, res, next) =>{
    const [category, items] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Item.find({category:req.params.id},"name quantity")
    ]);
    console.log("catetory detail")
    res.render("category_detail",{
        title: "Category Details",
        category :category,
        item_list:items,
    });
});

exports.category_create_get = asyncHandler(async (req, res, next) =>{
    console.log("create category");
    res.render("category_form",{
        title: "Create Category"
    });
});

exports.category_create_post = [
    body("category_name")
        .trim()
        .isLength({min: 1})
        .isAlphanumeric()
        .withMessage("Name should be alphanumeric characters"),
        asyncHandler(async (req, res, next) =>{
            const error = validationResult(req);
            const category = new Category({
                name:req.body.category_name,
            });
            if(!error.isEmpty()){
                console.log("there is a error save the data");
                res.render("category_form", {
                    title: "Create Category", 
                    category:category,
                });
                return;
            }
            else{
                console.log("create post")
                await category.save();
                res.redirect(category.url);
            }
        })
    ];

exports.category_update_get = asyncHandler(async (req, res, next) =>{
    const category = await Category.findById(req.params.id).exec();
    if(category=== null){
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
    }
    res.render("category_form",{title: "Update Category", category: category});
});

exports.category_update_post = [    
    body("category_name")
        .trim()
        .isLength({min: 1})
        .isAlphanumeric()
        .withMessage("Name should be alphanumeric characters"),
    asyncHandler(async (req, res, next) =>{
        const error = validationResult(req);
        const category = new Category({
            name:req.body.category_name,
            _id:req.params.id,
        });
        if(!error.isEmpty()){
            console.log("there is a error save the data");
            res.render("category_form", {
                title: "Update Category", 
                category:category,
            });
            return;
        }
        else{
            console.log("update post")
            await Category.findByIdAndUpdate(req.params.id, category)
            res.redirect(category.url);
        }
    })
];

exports.category_delete_get = asyncHandler(async (req, res, next) =>{
    const[category, categoryItem] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Item.find({category: req.params.id},"name quantity")
    ]);
    if(category === null){
        console.log("No category result");
        res.redirect("/category");
    }
    res.render("category_delete",{
        title: "Delete Category",
        category: category,
        category_items: categoryItem
    });
});

exports.category_delete_post = asyncHandler(async (req, res, next) =>{
    console.log("category delete post")
    const[category, categoryItems] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Item.find({category:req.params.id},"name quantity"),
    ]);
    if(categoryItems.length>0){
        res.render("category_delete",{
            title: "Delete Category",
            category: category,
            category_items: categoryItems
        });
        return;
    }
    else{
        await Category.findByIdAndDelete(req.body.categoryid);
        res.redirect("/category");
    }

});
