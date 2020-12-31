const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const http = require('http').createServer(app)
const session = require('express-session')
const sessionLogger = require('./middlewares/sessionLogger')
//const loginMiddleware = require('./middlewares/loginMiddleware')
const accountRoutes = require('./routes/AccoutRoutes')
const clupperRoutes = require('./routes/ClupperRoutes')
const storeManagerRoutes = require('./routes/StoreManagerRoutes')

//-----LOAD MIDDLEWARES----
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
    name: 'sid',
    secret: 'password super segreta',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: null
    }

}))
//app.use(loginMiddleware)
//-----LOAD ROUTES------
app.use(sessionLogger)
app.use('/', accountRoutes)
app.use('/', clupperRoutes)
app.use('/', storeManagerRoutes)

//Static Files
app.use(express.static('../Clup/src/view'));
// WebApp Routes
app.get('/', (req, res) => {
    res.sendFile('/index.html', {root: '../Clup/src/view/'})
})

module.exports = http