const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/', (req, res, next) => {
    res.render('index')
})

router.get('/login', (req, res, next) => {
    res.render('login', {messages: req.flash('loginMessage')})
})

router.get('/profile', (req, res, next) => {
    res.render('profile')
})

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/login',
    passReqToCallback: true
}))

router.post('/signin', (req, res, next) => {
    res.render('login')
})

module.exports = router