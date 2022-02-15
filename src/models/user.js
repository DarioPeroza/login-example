const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const schema = new mongoose.Schema({ 
    username:   { type: String, require: true },
    password:   { type: String, require: true },
    cellphone:  { type: String },
    date:       { type: Date, default: Date.now }
});

schema.methods.encryptPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

schema.methods.comparePassword = (password) => bcrypt.compareSync(password, this.password)

module.exports = mongoose.model('users', schema);