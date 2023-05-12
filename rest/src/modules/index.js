// register all routes here

const s3Routes = require('./s3/s3.route');
const urlRoutes = require('./url/url.route');
const authRoutes = require('./auth/auth.route');


function routes(app) {
    app.use('/s3', s3Routes);
    app.use('/link', urlRoutes);
    app.use('/auth', authRoutes)
}

module.exports = routes;