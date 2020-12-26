const server = require('./controller/server')

server.listen(3000, () => {
    console.log('listening on *:3000')
})