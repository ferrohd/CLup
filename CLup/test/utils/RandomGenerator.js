const crypto = require('crypto')

class RandomGenerator {
    static getRandomString(len) {
        return crypto.randomBytes(len).toString('hex')
    }
    static getRandomInt(min, max) {
        return Math.random() * (max - min) + min
    }
    static getRandomBool() {
        return Math.random() > 0.5
    }
}

module.exports = RandomGenerator