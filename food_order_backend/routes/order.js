var express = require('express');
var router = express.Router();
const order = require('../models/orderModel');

/* GET users listing. */
router
.get('/', (req, res, next) => {
  order.find({})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post('/',(req, res, next) => {
  order.create(req.body)
  .then((dish) => {
      console.log('Dish Created ', dish);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dish);
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports = router;
