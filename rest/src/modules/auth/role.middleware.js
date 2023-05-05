"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var APIError = require('../../utils/error');

function hasRole(roles) {
    var fn = function (req, res, next) {
        var reqRole = req._user["https://hasura.io/jwt/claims"]["x-hasura-allowed-roles"];
        if (reqRole === roles || roles.some(function (role) { return reqRole.includes(role); })) {
            next();
        }
        else {
            var err = new APIError('Unauthorized', 403);
            next(err);
        }
    };
    return fn;
}
module.exports = hasRole;
