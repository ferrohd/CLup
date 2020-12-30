const router = require('express').Router()
const AccountServices = require('../services/AccountServices')
const accountServices = new AccountServices()
const User = require('./../../model/UserModel')
const Store = require('./../../model/StoreModel')
const multer = require('multer')()


//-------ACCOUNT MANAGEMENT ROUTES-------------

// Renders logjn page
router.get('/login', (req, res) => {
    //se sono loggato vado a /explore o /overview
    //renderizza la pagina di login
    res.sendFile('/login.html', {root: '../Clup/src/view/'})
})

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    if (!(email && password)) res.send(400)
    else {
        const user = await accountServices.accountManagement.getUser(email, password)
        // console.log(user)
        if (user) {
            // Set the session
            req.session.user = user.toJSON()
            if(user.isClupper()) res.redirect('/explore')
            else res.redirect('/overview')
        // } else res.redirect('/login')
        } else res.sendStatus(404);
    }
})

// Logout user
router.get('/logout', (req, res) => {
    //console.log(req.session)
    req.session.destroy( _ => {
        res.clearCookie('sid')
        res.redirect('/login')
    })
})

// Renders register page
router.get('/register', (req, res) => {
    //se sono loggato vado a /explore
    //altrimenti rimango qui
    res.sendFile('/register.html', {root: '../Clup/src/view/'})
})

// Register clupper
router.post('/register', async (req, res) => {
    const { name, surname, email, password } = req.body
    if (!(name && surname && email && password)) res.redirect('/register')
    else {
        const user = new User(name, surname, email, password)
        let success =  await accountServices.accountManagement.registerClupper(user)
        
        if (success) res.redirect('/login')
        else res.redirect('/register')
    }
})

// Renders register store manager page
router.get('/register-store', (req, res) => {
    //se sono loggato vado a /explore
    //altrimenti rimango qui
    res.sendFile('/register-store.html', {root: '../Clup/src/view/'})
})

// Register store manager
router.post('/register-store', async (req, res) => {
    const { name, surname, email, password, storeName, address, vat, capacity } = req.body
    if (!(name && surname && email && password)) res.sendStatus(400)
    else if (!(storeName && address && vat && capacity)) res.sendStatus(400)
    else {
        const user = new User(name, surname, email, password, vat)
        const {lat, lng} = await accountServices.accountManagement.getPositionFromAddress(address)
        const store = new Store(storeName, vat, lat, lng, capacity)
        let success = await accountServices.accountManagement.registerStoreManager(user, store)
        
        if (success) res.redirect('/login')
        else res.redirect('/register-store')
    }
})

module.exports = router
