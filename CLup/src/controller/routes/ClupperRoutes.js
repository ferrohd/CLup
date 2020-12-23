const router = require('express').Router()
const ClupperServices = require('../services/ClupperServices')
const clupperServices = new ClupperServices()
//-------------QUEUE ROUTES---------------------

// Get queue status
router.get('/queue/status', (req, res) => {
    const { store } = req.body
    const email = req.session.user
    const queueStatus = clupperServices.queueManagement.getQueueStatus(email, store)
    res.json(queueStatus)
})

// Join queue route
router.post('/queue/join', (req, res) => {
    const { store } = req.body
    const email = req.session.user
    const ticket = clupperServices.queueManagement.joinQueue(email, store)
    res.json(ticket)
})

// Leave queue route
router.post('/queue/leave', (req, res) => {
    const { ticket } = req.body
    clupperServices.queueManagement.leaveQueue(ticket)
    res.send(200)
})

//-------------BOOKING ROUTES---------------------
// Get booking status
router.get('/booking/status', (req, res) => {
    const { ticket } = req.body
    const bookingStatus = clupperServices.bookingManagement.getBookingStatus(ticket)
    res.json(bookingStatus)
})

// Create Booking
router.post('/booking/create', (req, res) => {
    const { store, from, to } = req.body
    const email = req.session.user
    const ticket = clupperServices.bookingManagement.createBooking(email, store, from, to)
    res.json(ticket.toJSON())
})

// Delete booking
router.post('/booking/delete', (req, res) => {
    const { ticket } = req.body
    clupperServices.bookingManagement.deleteBooking(ticket)
    res.send(200)
})

// Get avaiable timeSlots
router.get('/booking/avaiableTimeslots', (req, res) => {
    const { store } = req.body
    const timeSlots = clupperServices.bookingManagement.getAvaiableTimeSlots(store)
    res.json(timeSlots)
})

//-------------STORE LOCATOR ROUTES---------------------
// Find store
router.get('/map/find', (req, res) => {
    const bookingStatus = clupperServices.storeLocator.findPositionByAddress()
    const bookingStatus1 = clupperServices.storeLocator.findStoreByPosition()
    const bookingStatus2 = clupperServices.storeLocator.findNearStores()
})

module.exports = router