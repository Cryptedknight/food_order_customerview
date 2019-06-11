const db = require("../models");

module.exports = {
    findAll: (req, res) => {
        db.Customer 
            .find()
            .then(dbCustomer => res.json(dbCustomer))
            .catch(err => res.status(422).json(err));
    },
    createCustomer: (req, res) => {
        //req.params.id refers to customerId
        db.Customer
            .create(req.body)
            .then(dbCustomer => {
                const customerId = dbCustomer._id;
                return db.User  
                            .findByIdAndUpdate(req.params.id, {$set: {customer: customerId}});
            })
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
    },
    updateCustomer: (req, res) => {
        if (req.body.orders) {
            //orders = []
            db.Customer
                .findByIdAndUpdate(req.params.id, {$push: {orders: req.body.orders}})
                .then(dbCustomer => res.json(dbCustomer))
                .catch(err => res.status(422).json(err));
        } else if (req.body.tableId) {
            db.Customer
                .findByIdAndUpdate(req.params.id, {$set: {table: req.body.tableId }})
                .then(dbCustomer => res.json(dbCustomer))
                .catch(err => res.status(422).json(err));
        } else {
            db.Customer
                .findByIdAndUpdate(req.params.id, req.body)
                .then(dbCustomer => res.json(dbCustomer))
                .catch(err => res.status(422).json(err));
        }
            
    }, 
    removeFromCustomer: (req, res) => {
        if (req.body.orderId) {
            db.Customer
                .findByIdAndUpdate(req.params.id, {$pull: {orders: req.body.orderId}})
                .then(dbCustomer => res.json(dbCustomer))
                .catch(err => res.status(422).json(err));
        } else if (req.body.tableId) {
            db.Customer
                .findByIdAndUpdate(req.params.id, {$unset: {table: req.body.tableId }})
                .then(dbCustomer => res.json(dbCustomer))
                .catch(err => res.status(422).json(err));
        } 
    },
    removeCustomer: (req, res) => {
        db.Customer
            .findByIdAndRemove(req.params.id)
            .then(() => res.json({message: "Customer Removed"}))
            .catch(err => res.status(422).json(err));
    }
}