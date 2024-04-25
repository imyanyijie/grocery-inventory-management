#! /usr/bin/env node

console.log(
    'This script populates some test itme and category to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Item = require("./models/item");
  const Category = require("./models/category");
  
  const items = [];
  const categories = [];

  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategory();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  async function categoryCreate(index, name) {
    const category = new Category({ name: name });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
  }
  
  async function itemCreate(index, name, description, quantity, price, date_added,category) {
    const itemDetail = {
      name: name,
      description: description,
      quantity: quantity,
      price: price,
      date_added:date_added,
    };
    if (category != false) itemDetail.category = category;
  
    const item = new Item(itemDetail);
    await item.save();
    items[index] = item;
    console.log(`Added item: ${name}`);
  }
  
  async function createCategory() {
    console.log("Adding category");
    await Promise.all([
      categoryCreate(0, "Fruit"),
      categoryCreate(1, "Vegetable"),
      categoryCreate(2, "Meet"),
    ]);
  }
  
  async function createItems() {
    console.log("Adding Items");
    await Promise.all([
    itemCreate(0,
        "Apple",
        "this is a apple",
        2,
        2.5,
        "2023-12-16",
        categories[0]
    ),
    itemCreate(0,
        "Banana",
        "this is a banana",
        2,
        2.5,
        "2023-11-16",
        categories[0]
    ),
    itemCreate(0,
        "Pork",
        "this is a Pork",
        10,
        11.4,
        "2024-12-16",
        categories[2]
    ),
    itemCreate(0,
        "tomatoes",
        "this is a tomatoe",
        2,
        2.5,
        "2023-12-16",
        categories[1]
    ),
    ]);
  }