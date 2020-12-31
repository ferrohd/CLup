module.exports =  function isLoggedIn(req, res, next) {
    if (!req.session.user) res.redirect('/login')
    else next()
}