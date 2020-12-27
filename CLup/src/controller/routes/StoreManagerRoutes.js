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

// Scan ticket at entrance
router.post('/ticket/scan/entrance', async (req, res) => {
    const { ticket } = req.body
    const valid = await storeManagerServices.scanTicket.scanEntrance(ticket)
})

// Scan ticket at exit
router.post('/ticket/scan/exit', async (req, res) => {
    const { ticket } = req.body
    const valid = await storeManagerServices.scanTicket.scanExit(ticket)
})

//------STORE MANAGEMENT ROUTES---------

// Edit store capacity
router.post('/store/capacity', (req, res) => {
    const { newCapacity } = req.body
    const storeManager = req.session.user
    storeManagerServices.editStoreCapacity(storeManager, newCapacity)
})

// Get store capacity
router.get('/store/capacity', (req, res) => {
    const storeManager = req.session.user
    return storeManagerServices.getStoreCapacity(storeManager)
})

module.exports = router