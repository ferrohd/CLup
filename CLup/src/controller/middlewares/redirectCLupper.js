module.exports =  function isLoggedIn(req, res, next) {
    if (!req.session.user.store) res.redirect(303, '/explore')
    else next()
}