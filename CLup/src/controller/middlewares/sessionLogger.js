module.exports =  function sessionLogger(req, res, next) {
    console.log(req.session)
    next()
}