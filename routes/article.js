const express = require('express')
const router = express.Router()
const passport = require('passport')

const { createArticle, getArticle, getArticles } = require('../controller/article')


//CREATE ARTICLE
router.post('/', createArticle)

//GET ARTCILE
router.get('/:id',passport.authenticate('jwt', { session: false }), getArticle)

//GET ARTICLES
router.get('/',passport.authenticate('jwt', { session: false }), getArticles)

module.exports = router