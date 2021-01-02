const router = require('express').Router()
const StoreManagerServices = require('../services/StoreManagerServices')
const storeManagerServices = new StoreManagerServices()
const loginMiddleware = require('../middlewares/checkLoginMiddleware')

router.use(loginMiddleware)

//---------STORE OVERVIEW ROUTES------------------

// Overview page
router.get('/overview', async (req, res) => {
    const messages = req.session.messages
    const user = req.session.user

    const store = await storeManagerServices.storeOverview.getStoreInfo(user.store)
    if(store.error) messages.push(store.error)

    const inside = await storeManagerServices.storeOverview.getStoreInside(user.store)
    if(inside.error) messages.push(store.error)

    res.render('overview', {store: store, inside: inside, messages: messages})
    req.session.messages = null
    req.session.save()
})

// Update store capacity
router.post('/store/capacity', async (req, res) => {
    const user = req.session.user
    const capacity = req.body.capacity
    if(!capacity) return res.redirectMessage('/overview', 'Invalid store capacity.')
    
    const result = await storeManagerServices.storeManagement.editStoreCapacity(user.store, capacity)
    if(result.error) return res.redirectMessage('/overview', result.error)
    
    res.redirect('/overview')
})

//-------SCAN TICKET ROUTES-----------

// Scan ticket at entrance or exit
router.post('/ticket/scan/', async (req, res) => {
    const user = req.session.user
    const ticketID = req.body.ticket
    if(!ticketID) return res.redirectMessage('/overview', 'Invalid ticket ID, access not allowed.')

    const ticketInside = await storeManagerServices.ticketManagement.getTicketInside(ticketID, user.store)
    if(ticketInside.sqlError) return res.redirectMessage('/overview', ticketInside.error + ' No information about the validity of the ticket.')
    if(ticketInside.error) return res.redirectMessage('/overview', ticketInside.error + ' Ticket is invalid, access not allowed.')

    if(ticketInside) {
        const result = await storeManagerServices.ticketManagement.deleteTicket(ticketID, user.store)
        if(result.error) return res.redirectMessage('/overview', result.error)
        return res.redirectMessage('/overview', 'Ticket valid, exit allowed.')
    }
    
    const capacity = await storeManagerServices.storeManagement.getStoreCapacity(user.store);
    if(capacity.error) return res.redirectMessage('/overview', capacity.error)
    const inside = await storeManagerServices.storeOverview.getStoreInside(user.store);
    if(inside.error) return res.redirectMessage('/overview', inside.error)

    if(inside >= capacity) return res.redirectMessage('/overview', 'The store is full. No information about the validity of the ticket.')

    const result = await storeManagerServices.ticketManagement.scanEntrance(ticketID, user.store)
    if(result.error) return res.redirectMessage('/overview', result.error)
    return res.redirectMessage('/overview', 'Ticket valid, entrance allowed.')
})

//------GUEST MANAGEMENT ROUTES----------

// Issue a new ticket
router.get('/ticket', async (req, res) => {
    const user = req.session.user

    const store = await storeManagerServices.storeOverview.getStoreInfo(user.store, false)
    if(store.error) return res.redirectMessage('/overview', store.error)

    const ticket = await storeManagerServices.guestManagement.issueTicket(user.email, user.store)
    if(ticket.error) return res.redirectMessage('/overview', ticket.error)

    res.render('issue-ticket', {store: store, ticket: ticket, messages: req.session.messages})
    req.session.messages = null
    req.session.save()
})

// Delete the last ticket issued
router.post('/ticket/delete', async (req, res) => {
    //DON'T WORK, MAYBE PROBLEM WITH DB CONFIGURATION
    const user = req.session.user
    const ticketID = req.body.ticket
    if(!ticketID) return res.redirectMessage('/overview', 'Invalid ticket ID.')

    const result = await storeManagerServices.ticketManagement.deleteTicket(ticketID, user.email, user.store)
    if(result.error) return res.redirectMessage('/overview', result.error)

    res.redirect("/overview");
})

module.exports = router