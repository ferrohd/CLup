const router = require('express').Router()
const ClupperServices = require('../services/ClupperServices')
const clupperServices = new ClupperServices()
const SharedServices = require('../services/SharedServices')
const sharedServices = new SharedServices()

const basePath = '/explore'

// Find Stores
router.get('/', async (req, res) => {
    const messages = req.session.messages
    const position = req.session.position

    const stores = await clupperServices.storeLocator.findNearStores(position)
    if(stores.error) messages.push(stores.error)
    else {
        for(store of stores) {
            const inline = await sharedServices.storeDetails.getStoreInLine(store.vat)
            if(inline.error) messages.push(inline.error)
            else store.inline = inline
        }
    }
    
    res.render('explore', {position: position != undefined, stores: stores, messages: messages})
    req.session.messages = null
    req.session.save()
})

// Add user's position to session
router.post('/', async (req, res) => {
    const position = req.body

    if(position.lat && position.lng)
        req.session.position = position
    
    res.redirect(basePath)
})

// Show selected store
router.get('/store', async (req, res) => {
    const user = req.session.user
    const position = req.session.position
    const vat = req.query.id
    if(!vat) return res.redirectMessage(basePath, 'Invalid store id.')

    const store = await clupperServices.storeLocator.getStoreInfo(vat, position)
    if(store.error) return res.redirectMessage(basePath, store.error)

    const ticket = await clupperServices.queueManagement.getQueueTicket(user.email)

    res.render('store', {position: position != undefined, inQueue: ticket.error == undefined, store: store, messages: req.session.messages})
    req.session.messages = null
    req.session.save()
})

//-------------QUEUE ROUTES---------------------

// Queue page
router.get('/queue', async (req, res) => {
    const user = req.session.user
    const position = req.session.position

    //- qrcode: base64 png image, background transparent, foreground: #272d2d
    const ticket = await clupperServices.queueManagement.getQueueTicket(user.email)
    if(ticket.error) return res.redirectMessage(basePath, ticket.error)

    const before = await clupperServices.queueManagement.getQueueBefore(ticket.store, ticket.date)
    if(before.error) return res.redirectMessage(basePath, before.error)

    const store = await clupperServices.storeLocator.getStoreInfo(ticket.store, position, false)
    if(store.error) return res.redirectMessage(basePath, store.error)

    ticket.qrcode = await ticket.toPNGBase64()

    //5 minutes per customer
    const time = before * 5

    res.render('queue', {position: position != undefined, store: store, ticket: ticket, before: before, time: time, messages: req.session.messages})
    req.session.messages = null
    req.session.save()
})

// Join queue route
router.post('/queue/join', async (req, res) => {
    const user = req.session.user
    const vat = req.body.store
    if(!vat) return res.redirectMessage(basePath, 'Invalid store id.')

    const ticket = await clupperServices.queueManagement.joinQueue(user.email, vat)
    if(ticket.error) return res.redirectMessage(basePath, ticket.error)
    
    res.redirect(basePath + '/queue')
})

// Leave queue route
router.post('/queue/leave', async (req, res) => {
    const user = req.session.user
    const vat = req.body.store
    if(!vat) return res.redirectMessage(basePath, 'Invalid store id.')

    const result = await clupperServices.queueManagement.leaveQueue(user.email, vat)
    if(result.error) return res.redirectMessage(basePath, result.error)

    res.redirect(basePath)
})

module.exports = router