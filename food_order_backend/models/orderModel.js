const mongoose = require("mongoose");
require("mongoose-double")(mongoose);
const Schema = mongoose.Schema;

const SchemaTypes = mongoose.Schema.Types;
const orderSchema = new Schema({
    dishName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    dishPrice: {
        type: SchemaTypes.Double,
        required: true
    },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

