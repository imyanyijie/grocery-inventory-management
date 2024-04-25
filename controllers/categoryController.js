const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.category_list = asyncHandler(async (req, res, next) => {
    res.send("return category list");
});

exports.category_detail = asyncHandler(async (req, res, next) =>{
    res.send("specific category"+req.params.id);
});

exports.category_create_get = asyncHandler(async (req, res, next) =>{
    res.send("create category get");
});

exports.category_create_post = asyncHandler(async (req, res, next) =>{
    
});

exports.category_update_get = asyncHandler(async (req, res, next) =>{
    res.send("category update post");
});

exports.category_update_post = asyncHandler(async (req, res, next) =>{
    
});

exports.category_delete_get = asyncHandler(async (req, res, next) =>{
    res.send("category delete post");
});

exports.category_delete_post = asyncHandler(async (req, res, next) =>{
    
});
