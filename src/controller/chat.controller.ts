import * as http from "http";
import * as express from "express"
import { Server } from "socket.io"

import { authenicateToken, authenticateSocketToken } from "../auth/auth";
import { ChatService } from "../service/chat.service";

export class ChatController {
    chatService: ChatService
    app: express.Express
    constructor(
        app: express.Express,
        chatService: ChatService
    ){
        this.app = app
        this.chatService = chatService
    }

    registerEndpoints(){
        const chatService = this.chatService
         this.app.post("/chats", authenicateToken, async function (req: express.Request, res: express.Response) {
            if (req.userId){
                await chatService.createNewChat(req.userId, req.body.recipient)
                return res.sendStatus(201)
            }

            return res.sendStatus(401)
        })

        this.app.get("/chats", authenicateToken, async function (req: express.Request, res: express.Response) {
            if (req.userId){
                const chats = await chatService.getAllChats(req.userId)
                return res.status(200).send(chats)
            }
            return res.sendStatus(401)
        })


        this.app.get("/chats/:id", authenicateToken,async function (req: express.Request, res: express.Response) {
            if (req.userId){
                const chat = await chatService.getChat(
                    req.userId,
                    Number.parseInt(req.params["id"]),
                )
                return res.status(200).send(chat)
            }
            return res.sendStatus(401)
        })

        this.app.post("/chats/:id/messages", authenicateToken,async function (req: express.Request, res: express.Response) {
            if (req.userId){
                await chatService.sendMessageToChat(
                    req.userId,
                    Number.parseInt(req.params["id"]),
                    req.body.message
                )
                return res.sendStatus(201)
            }
            return res.sendStatus(401)
        })
    }

    // registerSockets(server :http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>){
    //     const ioServer = new Server(server)
    //     ioServer.use(authenticateSocketToken)
    //         .on('connection', function(socket) {
    //             socket.on("private message", ({ message, toUserId }) => {
    //                 socket.to(to).emit("private message", {
    //                 content,
    //                 from: socket.id,
    //                 });
    //             });

    //         });
    // }
}