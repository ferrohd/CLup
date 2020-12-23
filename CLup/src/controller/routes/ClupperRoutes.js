const router = require('express').Router()
const clupperServices = require('../services/ClupperServices').ClupperServices()

//-------------QUEUE ROUTES---------------------

// Get queue status
router.get('/queue/status', (req, res) => {
    const queueStatus = clupperServices.queueManagement.getQueueStatus()
})

// Join queue route
router.post('/queue/join', (req, res) => {
    clupperServices.queueManagement.joinQueue()
})

// Leave queue route
router.post('/queue/leave', (req, res) => {
    lupperServices.queueManagement.leaveQueue()
})

//-------------BOOKING ROUTES---------------------
// Get booking status
router.get('/booking/status', (req, res) => {
    const bookingStatus = clupperServices.bookingManagement.getBookingStatus()
})

// Create Booking
router.post('/booking/create', (req, res) => {
    clupperServices.bookingManagement.createBooking()
})

// Delete booking
router.post('/booking/delete', (req, res) => {
    clupperServices.bookingManagement.deleteBooking()
})

// Get avaiable timeSlots
router.get('/booking/avaiableTimeslots', (req, res) => {
    const timeSlots = clupperServices.bookingManagement.getAvaiableTimeSlots()
})

//-------------STORE LOCATOR ROUTES---------------------
// Find store
router.get('/map/find', (req, res) => {
    const bookingStatus = clupperServices.storeLocator.findPositionByAddress()
    const bookingStatus = clupperServices.storeLocator.findStoreByPosition()
    const bookingStatus = clupperServices.storeLocator.findNearStores()
})

module.exports = router