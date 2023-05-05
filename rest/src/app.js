const express = require('express');
const cors = require('cors');
const passport = require('passport');
const APIError = require('./utils/error');
const ErrorHandler = require('./utils/errorHandler');
//const memcached = require('./utils/cache')
const routes = require('./modules');


const graphqlController = require('./graphql/controller');

const app = express();

// app.use("/public",express.static('static'));


app.use([
    express.urlencoded({ extended: false }),
    express.json()
]);

// use cross origin resource sharing
app.use(cors());

// use passport auth strategy
// require('./modules/auth/auth.strategy')(passport);


// passport middleware for auth
//app.use(passport.initialize());


// set routes middleware
routes(app);

app.use('/graphql', graphqlController);


// catch 404 routes
app.use(function (req, res, next) {
    const err = new APIError('Requested URL Not Found', 404);
    next(err);
});


// Error Handler
app.use(ErrorHandler);


module.exports = app;
