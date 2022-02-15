const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const isValidUsername = require('../helpers/isValidUsername')
const isValidPassword = require('../helpers/isValidPassword')

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    done(null, user._id)
})

passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    const existUser = await User.findOne({username: username})
    const {vePassword} = req.body

    if (existUser) {
        return done(null, false, req.flash('loginMessage', `Username: "${username}", is used by another account`))
    }
    if (isValidUsername(username) !== true) {
        return done(null, false, req.flash('loginMessage', isValidUsername(username)))
    }
    if (isValidPassword(password, vePassword) !== true) {
        return done(null, false, req.flash('loginMessage', isValidPassword(username)))
    }

    const user = new User()
    user.username = username
    user.password = user.encryptPassword(password)
    await user.save()
    done(null, user)
}))

passport.use('local-signin', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done) => {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, req.flash('loginMessage', 'Invalid username or password')); }
      if (!user.comparePassword(password)) { return done(null, false, req.flash('loginMessage', 'Invalid username or password')); }
      return done(null, user);
    })
}))