const app = require('express')();
const http = require('http').createServer(app);
const MongoClient = require('mongodb').MongoClient
var io = require('socket.io')(http);

//DB CONNECTION
var usersDB = null
var queueDB = null
var bookings
const connectionString = 'mongodb+srv://clupper:clupper@cluster0.ub8yu.mongodb.net/ClupperDB?retryWrites=true&w=majority'
MongoClient.connect(connectionString)
    .then(client => { console.log('Connected to DB')})
    .catch(err => { console.log(err)})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});