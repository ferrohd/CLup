const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const http = require('http').createServer(app)
const session = require('express-session')
const sessionLogger = require('./middlewares/sessionLogger')
const accountRoutes = require('./routes/AccoutRoutes')
const clupperRoutes = require('./routes/ClupperRoutes')
const storeManagerRoutes = require('./routes/StoreManagerRoutes')
const checkLoginMiddleware = require('./middlewares/checkLoginMiddleware')
const redirectStoreManager = require('./middlewares/redirectStoreManager')
const redirectClupper = require('./middlewares/redirectClupper')

//-----SET TEMPLATE ENGINE-----
app.set('view engine', 'pug')
//Template Files
app.set('views', path.join(__dirname, '../view/template/'))
//Static Files
app.use(express.static(path.join(__dirname, '../view/')))

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
app.use((req, res, next) => {
    res.redirectMessage = (url, message, code = 302) => {
        if(!req.session.messages) req.session.messages = []
        req.session.messages.push(message)
        res.redirect(code, url)
    }
    next()
})

// WebApp Routes
app.get('/', (req, res) => {
    res.render('index')
})

//-----LOAD ROUTES------

// Open routes
app.use('/', accountRoutes)

// Login-protected routes
app.use('/', checkLoginMiddleware)

app.use('/explore', redirectStoreManager)
app.use('/explore', clupperRoutes)

app.use('/overview', redirectClupper)
app.use('/overview', storeManagerRoutes)

module.exports = http
