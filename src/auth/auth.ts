import * as jwt from 'jsonwebtoken'
import * as io from "socket.io"
import { NextFunction, Request, Response } from "express"
import * as bcrypt from 'bcrypt';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { ExtendedError } from 'socket.io/dist/namespace';


export function generateAccessToken(userId) :string{
    console.log(process.env.TOKEN_SECRET)
    return jwt.sign({
        "sub": userId,
        "iat": Math.floor(Date.now()/1000)
    }, process.env.TOKEN_SECRET, {expiresIn: 60*60}) as string
}


export function authenicateToken(req :Request, res :Response, next :NextFunction){
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err:any, user: any) => {
        if (err) {
            console.error(err)
            return res.sendStatus(403)
        } 
        
        req.userId = user.sub
        next()
    })
}

export function authenticateSocketToken(socket : io.Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, next :(err?: ExtendedError) => void){
    if (socket.handshake.query && socket.handshake.query.token){
        
        jwt.verify(socket.handshake.query.token, process.env.TOKEN_SECRET as string, function(err, user) {
        if (err) return next(new Error('Authentication error'));
        socket.handshake.auth["user"] = user;
        next();
        });
    }
    else {
        next(new Error('Authentication error'));
    } 
}


export const Encrypt = {

    cryptPassword: (password: string) =>
        bcrypt.genSalt(10)
        .then((salt => bcrypt.hash(password, salt)))
        .then(hash => hash),
    
    comparePassword: (password: string, hashPassword: string) =>
            bcrypt.compare(password, hashPassword)
            .then(resp => resp)
    
}