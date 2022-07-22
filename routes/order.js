const express = require('express')
const router = express.Router()
const passport = require('passport')

const { createOrder, getOrder, getOrders } = require('../controller/order')


//CREATE ARTICLE
router.post('/', passport.authenticate('jwt', { session: false }), createOrder)

//GET ARTCILE
router.get('/:id',passport.authenticate('jwt', { session: false }), getOrder)

//GET ARTICLES
router.get('/',passport.authenticate('jwt', { session: false }), getOrders)

module.exports = router