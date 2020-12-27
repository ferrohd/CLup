const router = require('express').Router()
const AccountServices = require('../services/AccountServices')
const accountServices = new AccountServices()
const User = require('./../../model/UserModel')
const multer = require('multer')()


//-------ACCOUNT MANAGEMENT ROUTES-------------
// Register user
router.post('/register', multer.none(), async (req, res) => {
    const { name, surname, email, password, store } = req.body
    if (!(name && surname && email && password)) res.send(400)
    else {
        const user = new User(name, surname, email, password, store)
        let success = false
        if (user.isClupper()) success = await accountServices.accountManagement.registerClupper(user)
        else success = await accountServices.accountManagement.registerStoreManager(user)
        
        if (success) res.redirect('/login')
        else res.sendStatus(400)
    }
})

// Login user
router.post('/login', multer.none(), async (req, res) => {
    const { email, password } = req.body
    if (!(email && password)) res.send(400)
    else {
        const user = await accountServices.accountManagement.getUser(email, password)
        if (user) {
            req.session.user = user.email
            res.sendStatus(200)
        }
    }
})

// Logout user
router.post('/logout', multer.none(), (req, res) => {
    //console.log(req.session)
    req.session.destroy()
    res.redirect('/login')
})

module.exports = router
