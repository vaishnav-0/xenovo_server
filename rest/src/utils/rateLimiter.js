const rateLimit = require('express-rate-limit');


function RateLimiter(properties) {
    this.properties = {
        windowMs: properties.windowMs,
        max: properties.max,
        standardHeaders: properties.standardHeaders,
        legacyHeaders: properties.legacyHeaders,
        handler: this.handler
    }
}

RateLimiter.prototype.handler = function (req, res, next) {
    let message = "Rate limited"
    throw new APIError(message, 429);
}


RateLimiter.prototype.init = function (req, res, next) {
    console.log(2142432)
    return rateLimit(this.properties);
}

module.exports = new RateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});