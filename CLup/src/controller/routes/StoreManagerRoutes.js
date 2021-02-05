const router = require('express').Router()
const StoreManagerServices = require('../services/StoreManagerServices')
const storeManagerServices = new StoreManagerServices()

const basePath = '/overview'

//---------STORE OVERVIEW ROUTES------------------

// Overview page
router.get('/', async (req, res) => {
    const messages = req.session.messages
    const user = req.session.user

    const store = await storeManagerServices.storeOverview.getStoreInfo(user.store)
    if(store.error) messages.push(store.error)

    const inside = await storeManagerServices.storeOverview.getStoreInside(user.store)
    if(inside.error) messages.push(store.error)

    res.status(200).render('overview', {store: store, inside: inside, messages: messages})
    req.session.messages = null
    req.session.ticket = null
    req.session.save()
})

// Update store capacity
router.post('/capacity', async (req, res) => {
    const user = req.session.user
    const capacity = req.body.capacity
    if(!capacity || isNaN(capacity)) return res.redirectMessage(basePath, 'Invalid store capacity.', 303)
    
    const result = await storeManagerServices.storeManagement.editStoreCapacity(user.store, capacity)
    if(result.error) return res.redirectMessage(basePath, result.error, 303)
    
    res.redirect(basePath)
})

//-------SCAN TICKET ROUTES-----------

// Scan ticket at entrance or exit
router.post('/ticket/scan', async (req, res) => {
    const user = req.session.user
    const ticketID = req.body.ticket
    if(!ticketID) return res.redirectMessage(basePath, 'Invalid ticket ID, access not allowed.', 303)

    const ticketInside = await storeManagerServices.ticketManagement.getTicketInside(ticketID, user.store)
    if(ticketInside.sqlError) return res.redirectMessage(basePath, ticketInside.error + ' No information about the validity of the ticket.', 303)
    if(ticketInside.error) return res.redirectMessage(basePath, ticketInside.error + ' Ticket is invalid, access not allowed.', 303)

    if(ticketInside) {
        const result = await storeManagerServices.ticketManagement.deleteTicket(ticketID, user.store)
        if(result.error) return res.redirectMessage(basePath, result.error, 303)
        return res.redirectMessage(basePath, 'Ticket valid, exit allowed.')
    }
    
    const capacity = await storeManagerServices.storeManagement.getStoreCapacity(user.store);
    if(capacity.error) return res.redirectMessage(basePath, capacity.error, 303)
    const inside = await storeManagerServices.storeOverview.getStoreInside(user.store);
    if(inside.error) return res.redirectMessage(basePath, inside.error, 303)

    if(inside >= capacity) return res.redirectMessage(basePath, 'The store is full. No information about the validity of the ticket.', 303)

    const result = await storeManagerServices.ticketManagement.scanEntrance(ticketID, user.store)
    if(result.error) return res.redirectMessage(basePath, result.error, 303)
    return res.redirectMessage(basePath, 'Ticket valid, entrance allowed.')
})

//------GUEST MANAGEMENT ROUTES----------

// Get all ticket in queue
router.get('/ticket', async (req, res) => {
    const user = req.session.user

    const tickets = await storeManagerServices.ticketManagement.getTicketInQeueue(user.store)
    if(tickets.error) return res.redirectMessage(basePath, tickets.error, 303);

    const issuedTickets = tickets.filter((ticket) => ticket.user == user.email)
    issuedTickets.forEach((ticket) => ticket.before = tickets.indexOf(ticket))
    res.status(200).render('ticket-list', {tickets: issuedTickets})
})

// Issue a new ticket
router.get('/ticket/issue', async (req, res) => {
    const user = req.session.user

    const store = await storeManagerServices.storeOverview.getStoreInfo(user.store, false)
    if(store.error) return res.redirectMessage(basePath, store.error, 303)

    if(!req.session.ticket) {
        const ticket = await storeManagerServices.guestManagement.issueTicket(user.email, user.store)
        if(ticket.error) return res.redirectMessage(basePath, ticket.error, 303)
        ticket.qrcode = await ticket.toPNGBase64()
        req.session.ticket = ticket
    }


    res.status(200).render('issue-ticket', {store: store, ticket: req.session.ticket, messages: req.session.messages})
    req.session.messages = null
    req.session.save()
})

// Delete the last ticket issued
router.post('/ticket/delete', async (req, res) => {
    const user = req.session.user
    const ticketID = req.body.ticket
    if(!ticketID) return res.redirectMessage(basePath, 'Invalid ticket ID.', 303)

    const result = await storeManagerServices.ticketManagement.deleteTicket(ticketID, user.store)
    if(result.error) return res.redirectMessage(basePath, result.error, 303)

    res.redirect(basePath);
    req.session.ticket = null
    req.session.save()
})

module.exports = router