const { Store } = require('express-session')
const router = require('express').Router()
const StoreManagerServices = require('../services/StoreManagerServices')
const storeManagerServices = new StoreManagerServices()
const multer = require('multer')()

//---------STORE OVERVIEW ROUTES------------------

// Get number of people inside the store
router.get('/store/inside', async (req, res) => {
    const storeManager = req.session.user
    const insideStatus = await storeManagerServices.storeOverview.getInsideStatus(storeManager)
})

// Get number of people in queue
router.get('/store/queue', async (req, res) => {
    const storeManager = req.session.user
    const queueStatus = await storeManagerServices.storeOverview.getQueueStatus(storeManager)
})

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

// Edit store capacity
router.post('/store/capacity', (req, res) => {
    const { newCapacity } = req.body
    const storeManager = req.session.user
    storeManagerServices.editStoreCapacity(storeManager, newCapacity)
    res.status(200).send('/overview')
})

// Get store capacity
router.get('/store/capacity', (req, res) => {
    const storeManager = req.session.user
    return storeManagerServices.getStoreCapacity(storeManager)
})

module.exports = router