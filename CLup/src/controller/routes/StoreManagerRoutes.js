const router = require('express').Router()
const storeManagerServices = require('../services/StoreManagerServices').StoreManagerServices()

//---------STORE OVERVIEW ROUTES------------------

// Get number of people inside the store
router.get('/store/inside', (req, res) => {
    const insideStatus = storeManagerServices.storeOverview.getInsideStatus()
})

// Get number of people in queue
router.get('/store/queue', (req, res) => {
    const queueStatus = storeManagerServices.storeOverview.getQueueStatus()
})

// Get number of booking for the store
router.get('/store/booking', (req, res) => {
    const bookingStatus = storeManagerServices.storeOverview.getVookingStatus()
})

//-------SCAN TICKET ROUTES-----------

// Scan ticket at entrance
router.post('/ticket/scan/entrance', (req, res) => {
    const valid = storeManagerServices.scanTicket.scanEntrance()
})

// Scan ticket at exit
router.post('/ticket/scan/exit', (req, res) => {
    const valid = storeManagerServices.scanTicket.scanExit()
})

//------STORE MANAGEMENT ROUTES---------

// Edit store capacity
router.post('/store/capacity', (req, res) => {
    storeManagerServices.editStoreCapacity()
})

// Get store capacity
router.get('/store/capacity', (req, res) => {
    const storeCapacity = storeManagerServices.getStoreCapacity()
})

module.exports = router