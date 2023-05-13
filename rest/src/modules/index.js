// register all routes here

const s3Routes = require('./s3/s3.route');
const urlRoutes = require('./url/url.route');
const referalRoutes = require('./referral/referral.route');
const authRoutes = require('./auth/auth.route');


function routes(app) {
    app.use('/s3', s3Routes);
    app.use('/link', urlRoutes);
    app.use('/auth', authRoutes)
    app.use('/referral', referalRoutes)
}

module.exports = routes;