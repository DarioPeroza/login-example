const express = require('express')
const session = require('express-session')
const engine = require('ejs-mate')
const morgan = require('morgan')
const flash = require('connect-flash')
const passport = require('passport')
const path = require('path')
const app = express()
require('dotenv').config()

// Database
const { mongoose } = require('./database')

// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.static('src/public'));

// Login
require('./passport/local')
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

// Setting
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.set('port', process.env.PORT || 3000)

// Routes
app.use('/', require('./routes/index'))

// Start
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})