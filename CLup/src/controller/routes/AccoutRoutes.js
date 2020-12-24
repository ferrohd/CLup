const router = require('express').Router()
const AccountManagement = require('../services/AccountServices')
const accountManagement = new AccountManagement()
const User = require('./../../model/UserModel')
//-------ACCOUNT MANAGEMENT ROUTES-------------

// Register user
router.post('/register', (req, res) => {
    const { name, surname, email, password, store } = req.body
    if (!(name || surname || email || password)) res.send(400)
    else {
        const user = new User(name, surname, email, password, store)
        if (user.isClupper()) accountManagement.registerClupper(user)
        else accountManagement.registerStoreManager(user)
        res.redirect('/login')
    }
})

// Login user
router.post('/login', (req, res) => {
    const { email, password } = req.body
    if (!(email || password)) res.send(400)
    else {
        const user = accountManagement.login(email, password)
        if (user) {
            req.session.user = user.email
        }
        res.redirect('/')
    }
})

// Logout user
router.post('/logout', (req, res) => {
    req.session.destroy()
})

module.exports = router