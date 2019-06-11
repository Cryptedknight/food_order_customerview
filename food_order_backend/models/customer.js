const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: false,
        //match: [/\d{3}-\d{3}-\d{4}/, "Please provide a phone number."]
    },
    customerEmail: {
        type: String,
        required: true,
        unique: true,
        //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email."]
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: "Order"
    }]
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
