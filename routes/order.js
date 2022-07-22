const express = require('express')
const router = express.Router()
const passport = require('passport')

const { createOrder, getOrder, updateOrder, getOrders } = require('../controller/order')


//CREATE ORDER
router.post('/', passport.authenticate('jwt', { session: false }), createOrder)

//GET ORDER
router.get('/:id',passport.authenticate('jwt', { session: false }), getOrder)

//UPDATE ORDER
router.get('/:id',passport.authenticate('jwt', { session: false }), updateOrder)

//GET ORDERS
router.get('/',passport.authenticate('jwt', { session: false }), getOrders)

module.exports = router