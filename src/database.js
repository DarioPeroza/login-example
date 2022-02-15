require('dotenv').config()
const mongoose = require('mongoose')
const USERNAME = process.env.DATABASE_USERNAME
const PASSWORD = process.env.DATABASE_PASSWORD
const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.nicov.mongodb.net/login-examples?retryWrites=true&w=majority`

mongoose.connect(URI)
    .then(db => console.log("Database is connect"))
    .catch(err => console.log(err))

module.exports = mongoose