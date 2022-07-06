/*jshint esversion: 8 */

var { expressjwt: jwt } = require("express-jwt");

function authJwt() {
    const jwtSecret = process.env.SECRET;
    const api = process.env.API_URL;
    return jwt({
        secret: jwtSecret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            /* { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
            `${api}/users/login`,
            `${api}/users/register` */
            { url: /(.*)/ }
        ]
    });
}

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        done(null, true);
    }

    done();
}

module.exports = authJwt;
