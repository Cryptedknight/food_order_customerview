const db = require("../models");

module.exports = {
    findAll: (req, res) => {
        if (req.query) {
            db.Order
                .find(req.query)
                .populate("restaurant")
                .populate("customer")
                .then(dbOrder => res.json(dbOrder))
                .catch(err => res.status.json(err));
        }  else {
            db.Order
                .find()
                .populate("restaurant")
                .populate("customer")
                .then(dbOrder => res.json(dbOrder))
                .catch(err => res.status.json(err));
        }
    },
    findById: (req, res) => {
        db.Order
            .findById(req.params.id)
            .populate("restaurant")
            .populate("customer")
            .then(dbOrder => res.json(dbOrder))
            .catch(err => res.status.json(err));
    },
    createOrder: (req, res) => {
        db.Order
            .create(req.body)
            .then(dbOrder => res.json(dbOrder))
            .catch(err => res.status(422).json(err));
    },
    updateOrder: (req, res) => {
        db.Order
            .findByIdAndUpdate(req.params.id, req.body)
            .then(dbOrder => res.json(dbOrder))
            .catch(err => res.status(422).json(err));
    },
    removeOrder: (req, res) => {
        db.Order
            .findByIdAndRemove(req.params.id)
            .then(() => res.json({message: "Order removed"}))
            .catch(err => res.status(422).json(err));
    }
}