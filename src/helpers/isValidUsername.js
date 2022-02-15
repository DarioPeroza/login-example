const validator = require('validator')

module.exports = function isValidUsername(username) {
    for (let index = 0; index < username.length; index++) {
        if (!/[a-z._]/i.test(username[index])) {
            return `"${username[index]}" is not a valid character`
        }
    }
    if (!validator.isLength(username, {min: 4})) {
        return `Username must contain at least 4 characters`
    }
    return true
}