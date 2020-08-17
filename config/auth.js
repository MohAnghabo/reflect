module.exports = {
    isAdmin: (req, res, next) => {
        console.log("is admin")
        if (req.isAuthenticated()) {
            console.log("isAuthenticated")
            return next();
        }
        // req.session.returnTo = req.originalUrl;
        console.log("redirecting")
        res.redirect('/login');
    },

    isLoggedIn: (req, res, next) => {
        console.log("isLoggedIn")

        if (req.isAuthenticated()) {
            res.redirect('/');
        }
        return next();
    }
};