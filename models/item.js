const mongoose = require("mongoose");
const {DateTime} = require("luxon");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name:{type: String, required: true, maxLength: 100}, 
    description:{type: String, minLength: 3},
    quantity:{type: Number, required: true},
    price:{type: Number, required: true},
    date_added:{type: Date, default: Date.now}, 
    img_path:{type: String},
    category:{type: Schema.Types.ObjectId, ref:"Category"}
});

//Virtual for item url
ItemSchema.virtual("url").get(function (){
    return `/item/${this._id}`;
});

ItemSchema.virtual("date_formatted").get(function(){
 return DateTime.fromJSDate(this.date_added).toISODate();    
})
module.exports = mongoose.model("Item", ItemSchema);