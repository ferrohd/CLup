const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const http = require('http').createServer(app)
const session = require('express-session')
const loginMiddleware = require('./middlewares/loginMiddleware')
const accountRoutes = require('./routes/AccoutRoutes')
const clupperRoutes = require('./routes/ClupperRoutes')
const storeManagerRoutes = require('./routes/StoreManagerRoutes')

//-----LOAD MIDDLEWARES----
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
    secret: 'password super segreta',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 60 * 60
    }

}))
//app.use(loginMiddleware)
//-----LOAD ROUTES------
app.use('/', accountRoutes)
app.use('/', clupperRoutes)
app.use('/', storeManagerRoutes)

//Static Files
app.use(express.static('../Clup/src/view'));
// WebApp Routes
app.get('/', (req, res) => {
    res.sendFile('/index.html', {root: '../Clup/src/view/'})
})
app.get('/login', (req, res) => {
    res.sendFile('/login.html', {root: '../Clup/src/view/'})
})
app.get('/register', (req, res) => {
    res.sendFile('/register.html', {root: '../Clup/src/view/'})
})
app.get('/register-store', (req, res) => {
    res.sendFile('/register-store.html', {root: '../Clup/src/view/'})
})
app.get('/explore', (req, res) => {
    res.sendFile('/explore.html', {root: '../Clup/src/view/'})
})
app.get('/queue', (req, res) => {
    res.sendFile('/queue.html', {root: '../Clup/src/view/'})
})
app.get('/store', (req, res) => {
    res.sendFile('/store.html', {root: '../Clup/src/view/'})
})
app.get('/overview', (req, res) => {
    res.sendFile('/overview.html', {root: '../Clup/src/view/'})
})
app.get('/print-ticket', (req, res) => {
    res.sendFile('/print-ticket.html', {root: '../Clup/src/view/'})
})
module.exports = http