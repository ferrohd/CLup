const router = require('express').Router()
const ClupperServices = require('../services/ClupperServices')
const clupperServices = new ClupperServices()
const multer = require('multer')()
//-------------QUEUE ROUTES---------------------

// Get queue position
router.get('/queue/status', multer.none(), async (req, res) => {
    const { store, email } = req.body
    if (store && email) {
        const queueStatus = await clupperServices.queueManagement.getQueueStatus(email, store)
        res.json(queueStatus)
    }
    else res.sendStatus(400)
})

// Join queue route
router.post('/queue/join', multer.none(), async (req, res) => {
    const { store, user } = req.body
    console.log(req.body)
    if (store && user) {
        const ticket = await clupperServices.queueManagement.joinQueue(user, store)
        res.json(ticket)
    }
    else res.sendStatus(400)
})

// Leave queue route
router.post('/queue/leave', multer.none(), async (req, res) => {
    const ticket = req.body.id
    if (ticket) {
        await clupperServices.queueManagement.leaveQueue(ticket)
        res.sendStatus(200)
    }
    else res.sendStatus(400)
})

//-------------STORE LOCATOR ROUTES---------------------
// Find store
router.get('/map/find', multer.none(), (req, res) => {
    const bookingStatus = clupperServices.storeLocator.findPositionByAddress()
    const bookingStatus1 = clupperServices.storeLocator.findStoreByPosition()
    const bookingStatus2 = clupperServices.storeLocator.findNearStores()
})

module.exports = router