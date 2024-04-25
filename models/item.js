const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name:{type: String, required: true, maxLength: 100}, 
    description:{type: String, minLength: 3},
    quantity:{type: Number, required: true},
    price:{type: Number, required: true},
    date_added:{type: Date}, 
    category:{type: Schema.Types.ObjectId, ref:"Category"}
});

//Virtual for item url
ItemSchema.virtual("url").get(function (){
    return `/itme/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);