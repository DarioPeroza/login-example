const validator = require('validator')

module.exports = function isValidPassword(password, vePassword) {
    if (!validator.isLength(password, {min: 8})) {
        return `Password must contain at least 8 characters`
    }
    if (typeof vePassword === 'string' && !validator.matches(password, vePassword)) {
        return `Passwords do not match`
    }
    return true
}