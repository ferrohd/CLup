const router = require('express').Router()
const ClupperServices = require('../services/ClupperServices')
const clupperServices = new ClupperServices()
const loginMiddleware = require('../middlewares/checkLoginMiddleware')

// Check if the user is logged in
router.use(loginMiddleware)

// Find Stores
router.get('/explore', async (req, res) => {
    const position = req.query
    if (position.lng && position.lat) {
        // Array degli store sortato da mostrare ;)
        const stores = await clupperServices.storeLocator.findNearStores(position)
    }
    res.sendFile('/explore.html', {root: '../Clup/src/view/'})
})

// Show selected store
router.get('/store', async (req, res) => {
    const user = req.session.user
    const storeID = req.query.id

    // Store da mostrare ;)
    const store = await clupperServices.storeLocator.getStoreInfo(storeID)

    res.sendFile('/store.html', {root: '../Clup/src/view/'})
})

//-------------QUEUE ROUTES---------------------

// Queue page
router.get('/queue', async (req, res) => {
    const user = req.session.user
    
    //{ticketID, storeID, position, peopleInQueue}
    // Info da mostrare ;)
    const queueStatus = await clupperServices.queueManagement.getQueueStatus(email, store)
    const store = await clupperServices.storeLocator.getStoreInfo(queueStatus.storeID)

    res.sendFile('/queue.html', {root: '../Clup/src/view/'})
})

// Join queue route
router.post('/queue/join', async (req, res) => {
    const { store } = req.body
    const user = req.session.user

    // Biglietto da mostrare ;) [qui c'è da capire come gestirla, perchè deve fare un redirect alla queue status ma allo stesso tempo passare il biglietto al client, probabilmente ha senso passare i dati del biglietto via url nella redirect]
    const ticket = await clupperServices.queueManagement.joinQueue(user.email, store)
    
    if(ticket != null) res.send(ticket)
    else res.sendStatus(400)

})

// Leave queue route
router.post('/queue/leave', async (req, res) => {
    const ticket = req.body.id
    if (ticket) {
        await clupperServices.queueManagement.leaveQueue(ticket)
        res.status(200).send('/explore')
    }
    else res.sendStatus(400)
})

module.exports = router