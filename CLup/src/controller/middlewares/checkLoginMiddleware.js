module.exports =  function isLoggedIn(req, res, next) {
    if (!req.session.user) res.redirect(303, '/login')
    else next()
}