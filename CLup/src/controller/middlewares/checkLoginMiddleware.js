module.exports =  function isLoggedIn(req, res, next) {
    if (!res.local.user) res.redirect('/login')
    else next()
}