const { Store } = require('express-session')
const router = require('express').Router()
const StoreManagerServices = require('../services/StoreManagerServices')
const storeManagerServices = new StoreManagerServices()
const multer = require('multer')()

//---------STORE OVERVIEW ROUTES------------------

// SOLO OVERVIEW
//-------SCAN TICKET ROUTES-----------

// Scan ticket at entrance or exit
router.post('/ticket/scan/', async (req, res) => {
    const { ticket, inside } = req.body
    const valid = false
    if(inside)
        valid = await storeManagerServices.scanTicket.scanExit(ticket)
    else
        valid = await storeManagerServices.scanTicket.scanEntrance(ticket)
    //Should redirect to a page that displays "valid" value
    res.status(200).send('/overview')
})

//------STORE MANAGEMENT ROUTES---------

// Get store capacity
router.get('/store/capacity', (req, res) => {
    const storeManager = req.session.user
    return storeManagerServices.getStoreCapacity(storeManager)
})

// Update store capacity
router.post('/store/capacity', (req, res) => {
    const storeManager = req.session.user
    return storeManagerServices.getStoreCapacity(storeManager)
})

//------GUEST MANAGEMENT ROUTES----------

// Issue a new ticket
router.get('/ticket/issue', (req, res) => {
    const storeManager = req.session.user
    // const store = ?

    //msotro le info del biglietto appena generato
    res.redirect("/issue-ticket");
})

// Delete an issued ticket
router.post('/ticket/delete', (req, res) => {
    const ticket = req.body;
    //se non sono loggato vado su login
    

    res.redirect("/overview");
})

module.exports = router