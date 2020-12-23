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
    rolling: true,
    resave: false,
    cookie: {
        secure: false,
        maxAge: 60 * 60
    }

}))
app.use(loginMiddleware)
//-----LOAD ROUTES------
app.use(accountRoutes)
app.use(clupperRoutes)
app.use(storeManagerRoutes)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

http.listen(3000, () => {
    console.log('listening on *:3000')
})