const server = require('./controller/server')

server.listen(3000, () => {
    console.log('Server started.')
    console.log('Listening on http://0.0.0.0:3000')
})