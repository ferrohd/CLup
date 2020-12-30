module.exports =  function isLoggedIn(req, res, next) {
    if (!res.local.user.store) res.redirect('/explore')
    else next()
}