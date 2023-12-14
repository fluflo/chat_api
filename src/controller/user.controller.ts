import { Request, Response } from "express";
import * as core from "express-serve-static-core";
import { UserService } from "../service/user.service"
import { authenicateToken } from "../auth/auth";

export class UserController {
    userService :UserService
    app :core.Express
    constructor(
        app :core.Express,
        userService :UserService
    ){
        this.app = app
        this.userService = userService
    }
    registerEndpoints(){
        const userService = this.userService
        this.app.get("/users", authenicateToken, async function (req: Request, res: Response) {
            if (req.userId){
                const users = await userService.getAllUsers(false, req.userId)
                return res.status(200).json(users)
            }
        
            return res.status(401)
        })
        
        this.app.get("/users/:id", authenicateToken, async function (req: Request, res: Response) {
            if (req.userId){
                const user = await userService.getUser(req.userId)
                return res.status(200).json(user)
            }
        
            return res.status(401)
        })
        
        
        // app.put("/users/:id", authenicateToken, async function (req: Request, res: Response) {
        //     const exists = await dataSource.getRepository(AuthUser).exist({
        //         where:{
        //             id: Number.parseInt(req.params.id),
        //             username: req.user 
        //         }
        //     })
        
        //     if (exists) {
        //         await dataSource.getRepository(User).update({
        //             id: Number.parseInt(req.params.id)
        //         }, req.body)
        //         return res.status(204).send()
        //     }
        
        //     return res.status(400).send("User not found")
        // })
    }

}