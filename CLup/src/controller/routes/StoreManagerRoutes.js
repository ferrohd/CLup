const { Store } = require('express-session')
const router = require('express').Router()
const StoreManagerServices = require('../services/StoreManagerServices')
const storeManagerServices = new StoreManagerServices()
const loginMiddleware = require('../middlewares/checkLoginMiddleware')

router.use(loginMiddleware)

//---------STORE OVERVIEW ROUTES------------------


router.get('/overview', (req, res) => {
    const storeManager = req.session.user
    const store = storeManager.store

    // Info da mostrare ;)
    const storeInfo = storeManagerServices.storeOverview.getStoreInfo(store)
    const insideStatus = storeManagerServices.storeOverview.getInsideStatus(store)
    const queueStatus = storeManagerServices.storeOverview.getQueueStatus(store)
    const capacity = storeManagerServices.storeManagement.getStoreCapacity(store)
    res.sendFile('/overview.html', {root: '../Clup/src/view/'})
})

// Update store capacity
router.post('/store/capacity', (req, res) => {
    const storeManager = req.session.user
    return storeManagerServices.storeManagement.editStoreCapacity(storeManager)
})


router.get('/issue-ticket', (req, res) => {
    //se non sono loggato vado su login
    //msotro le info del biglietto appena generato
    res.sendFile('/issue-ticket.html', {root: '../Clup/src/view/'})
})
//-------SCAN TICKET ROUTES-----------

// Scan ticket at entrance or exit
router.post('/ticket/scan/', async (req, res) => {
    const { ticket, inside } = req.body
    let valid = false
    if(inside)
        valid = await storeManagerServices.scanTicket.scanExit(ticket)
    else
        valid = await storeManagerServices.scanTicket.scanEntrance(ticket)
    //Should redirect to a page that displays "valid" value
    res.status(200).send('/overview')
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