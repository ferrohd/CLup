const router = require('express').Router()
const AccountServices = require('../services/AccountServices')
const accountServices = new AccountServices()
const SharedServices = require('../services/SharedServices')
const sharedServices = new SharedServices()
const User = require('./../../model/UserModel')
const Store = require('./../../model/StoreModel')


//-------ACCOUNT MANAGEMENT ROUTES-------------

// Renders logjn page
router.get('/login', (req, res) => {
    res.render('login', {messages: req.session.messages})
    req.session.messages = null
    req.session.save()
})

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!(email && password))
        return res.redirectMessage('/login', 'Invalid username or password.', 303)

    const user = await accountServices.accountManagement.getUser(email, password)
    if (user.error)
        return res.redirectMessage('/login', user.error, 303)

    // Set the session
    req.session.user = user.toJSON()
    if(user.isClupper()) res.redirect('/explore')
    else res.redirect('/overview')
})

// Logout user
router.get('/logout', (req, res) => {
    req.session.destroy( _ => {
        res.clearCookie('sid')
        res.redirect('/login')
    })
})

// Renders register page
router.get('/register', (req, res) => {
    res.render('register', {messages: req.session.messages})
    req.session.messages = null
    req.session.save()
})

// Register clupper
router.post('/register', async (req, res) => {
    const { name, surname, email, password } = req.body
    if (!(name && surname && email && password))
        return res.redirectMessage('/register', 'Invalid values for the required fields.', 303)

    const user = new User(name, surname, email, password)
    const result = await accountServices.accountManagement.registerClupper(user)
    if (result.error)
        return res.redirectMessage('/register', result.error, 303)
    
    res.redirect('/login')
})

// Renders register store manager page
router.get('/register-store', (req, res) => {
    res.render('register-store', {messages: req.session.messages})
    req.session.messages = null
    req.session.save()
})

// Register store manager
router.post('/register-store', async (req, res) => {
    const { name, surname, email, password, storeName, address, vat, capacity } = req.body
    if (!(name && surname && email && password))
        return res.redirectMessage('/register-store', 'Invalid values for the required personal fields.', 303)
    if (!(storeName && address && vat && capacity))
        return res.redirectMessage('/register-store', 'Invalid values for the required store fields.', 303)

    const user = new User(name, surname, email, password, vat)
    const position = await sharedServices.positionStack.getPositionFromAddress(address)
    if(position.error)
        return res.redirectMessage('/register-store', position.error, 303)

    const store = new Store(storeName, vat, position.lat, position.lng, capacity)
    const result = await accountServices.accountManagement.registerStoreManager(user, store)
    if(result.error)
        return res.redirectMessage('/register-store', result.error, 303)
    
    res.redirect('/login')
})

module.exports = router
