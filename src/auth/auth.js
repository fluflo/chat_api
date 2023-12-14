"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encrypt = exports.authenticateSocketToken = exports.authenicateToken = exports.generateAccessToken = void 0;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
function generateAccessToken(userId) {
    console.log(process.env.TOKEN_SECRET);
    return jwt.sign({
        "sub": userId,
        "iat": Math.floor(Date.now() / 1000)
    }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 });
}
exports.generateAccessToken = generateAccessToken;
function authenicateToken(req, res, next) {
    var authHeader = req.headers.authorization;
    var token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, function (err, user) {
        if (err) {
            console.error(err);
            return res.sendStatus(403);
        }
        req.userId = user.sub;
        next();
    });
}
exports.authenicateToken = authenicateToken;
function authenticateSocketToken(socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, process.env.TOKEN_SECRET, function (err, user) {
            if (err)
                return next(new Error('Authentication error'));
            socket.handshake.auth["user"] = user;
            next();
        });
    }
    else {
        next(new Error('Authentication error'));
    }
}
exports.authenticateSocketToken = authenticateSocketToken;
exports.Encrypt = {
    cryptPassword: function (password) {
        return bcrypt.genSalt(10)
            .then((function (salt) { return bcrypt.hash(password, salt); }))
            .then(function (hash) { return hash; });
    },
    comparePassword: function (password, hashPassword) {
        return bcrypt.compare(password, hashPassword)
            .then(function (resp) { return resp; });
    }
};
