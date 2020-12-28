const router = require('express').Router()
const AccountServices = require('../services/AccountServices')
const accountServices = new AccountServices()
const User = require('./../../model/UserModel')
const Store = require('./../../model/StoreModel')
const multer = require('multer')()


//-------ACCOUNT MANAGEMENT ROUTES-------------
// Register clupper
router.post('/register', multer.none(), async (req, res) => {
    const { name, surname, email, password } = req.body
    if (!(name && surname && email && password)) res.sendStatus(400)
    else {
        const user = new User(name, surname, email, password)
        let success =  await accountServices.accountManagement.registerClupper(user)
        
        if (success) res.status(200).send('/login')
        else res.sendStatus(400)
    }
})

// Register store manager
router.post('/register-store', multer.none(), async (req, res) => {
    const { name, surname, email, password, storeName, address, vat, capacity } = req.body
    if (!(name && surname && email && password)) res.sendStatus(400)
    else if (!(storeName && address && vat && capacity)) res.sendStatus(400)
    else {
        const user = new User(name, surname, email, password, vat)
        const {lat, lng} = await accountServices.accountManagement.getPositionFromAddress(address)
        const store = new Store(storeName, vat, lat, lng, capacity)
        let success = await accountServices.accountManagement.registerStoreManager(user, store)
        
        if (success) res.status(200).send('/login')
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
            console.log(user.isClupper());
            if(user.isClupper()) res.status(200).send('/explore')
            else res.status(200).send('/overview')
        }
    }
})

// Logout user
router.post('/logout', multer.none(), (req, res) => {
    //console.log(req.session)
    req.session.destroy()
    res.status(200).send('/login')
})

module.exports = router
