const router = require('express').Router()
const accountManagement = require('../services/AccountServices').AccountServices()

//-------ACCOUNT MANAGEMENT ROUTES-------------

// Register user
router.post('/register', (req, res) => {
    accountManagement.registerClupper()
    accountManagement.registerStoreManager()
})

// Login user
router.post('/login', (req, res) => {
    accountManagement.login()
})

// Logout user
router.post('/logout', (req, res) => {
    accountManagement.logout()
})

module.exports = router