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

module.exports = router