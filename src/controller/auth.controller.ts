import { Request, Response } from "express";
import * as core from "express-serve-static-core";

import { AuthService } from "../service/auth.service";
import { CreateUserDto } from "../dto/createUser.dto";
import { validateOrReject } from "class-validator";

export class AuthController {
    authService :AuthService
    app :core.Express
    constructor(
        app :core.Express,
        authService :AuthService
    ){
        this.app = app
        this.authService = authService
    }

    registerEndpoints() {
        const authService = this.authService
        this.app.post("/users/login", async function(req: Request, res: Response){
            if (!req.body || !req.body.username || !req.body.password){
                return res.send(400).send("Please provide a username and password");
            }
        
            const accessToken = await authService.authenticate(req.body.username, req.body.password)
            if (!accessToken) return res.sendStatus(403)
            
            return res.status(200).send({
                token: accessToken
            });
        })
        
        this.app.post("/users", async function(req: Request<any, any,CreateUserDto>, res: Response){
            try {
                let createUser = new CreateUserDto()
                createUser.firstName = req.body.firstName
                createUser.lastName = req.body.lastName
                createUser.username = req.body.username
                createUser.password = req.body.password
                await validateOrReject(createUser)
            } catch (err) {
                return res.status(400).send(err);
        
            }
        
            await authService.register(req.body)
        
            return res.sendStatus(201)
        })
    }

}