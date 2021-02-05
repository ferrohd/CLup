const crypto = require('crypto')

class RandomGenerator {
    static getRandomString(len) {
        return crypto.randomBytes(len).toString('hex').slice(0, len);
    }
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    static getRandomBool() {
        return Math.random() > 0.5
    }
}

module.exports = RandomGenerator