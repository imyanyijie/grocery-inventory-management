const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.item_list = asyncHandler(async (req, res, next) => {
    res.send("return category list");
});

exports.item_detail = asyncHandler(async (req, res, next) =>{
    res.send("specific category"+req.params.id);
});

exports.item_create_get = asyncHandler(async (req, res, next) =>{
    res.send("create category get");
});

exports.item_create_post = asyncHandler(async (req, res, next) =>{
    
});

exports.item_update_get = asyncHandler(async (req, res, next) =>{
    res.send("category update post");
});

exports.item_update_post = asyncHandler(async (req, res, next) =>{
    
});

exports.item_delete_get = asyncHandler(async (req, res, next) =>{
    res.send("category delete post");
});

exports.item_delete_post = asyncHandler(async (req, res, next) =>{
});