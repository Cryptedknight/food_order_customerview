const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect("mongodb://127.0.0.1/food_order");

const userSeed = {
  firstName: "Utkarsh",
  lastName: "Dwivedi",
  username: "UtkarshD",
  password: "xyzz",
};

const customerSeed = {
  customerName: "Utkarsh",
  customerPhone: "9125511",
  customerEmail: "xyz@gmail.com"
}

db.User.collection.drop();
db.Customer.collection.drop();

db.User
  .remove()
  .then(()=> db.User.create(userseed))
  .then(created => {
    console.log("success")
  })
db.Customer
  .remove()
  .then(() => db.Customer.create(customerSeed))
  .then(created => {
    console.log("success")
    db.User.findOneAndUpdate({username: "Utkarsh"}, {$set: {customer: created._id}})
    .then(updated => console.log("success"))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
