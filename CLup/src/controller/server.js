const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const http = require('http').createServer(app)
const session = require('express-session')
const loginMiddleware = require('./middlewares/loginMiddleware')
var io = require('socket.io')(http)

//---LOAD MIDDLEWARES
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
        maxAge: 60 * 60 * 24
    }

}))
app.use(loginMiddleware)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('a user connected')
})

http.listen(3000, () => {
    console.log('listening on *:3000')
})