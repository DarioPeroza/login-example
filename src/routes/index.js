const express = require('express')
const router = express.Router()
const passport = require('passport')
const isAuthenticated = require('../helpers/isAuthenticated')

router.get('/', (req, res, next) => {
    res.render('index', {messages: req.flash('loginMessage')})
})

router.get('/profile', isAuthenticated, (req, res, next) => {
    res.render('profile')
})

router.get('/logout', (req, res, next) => {
    req.logout()
    res.redirect('/')
})

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/',
    passReqToCallback: true
}))

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/',
    passReqToCallback: true
}))

module.exports = router