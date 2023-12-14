import * as express from "express"
import * as cors from "cors"
import * as dotenv from 'dotenv'
import dataSource from "./data-source";

import { UserRepository } from "./repository/user.repository";
import { AuthService } from "./service/auth.service";
import { AuthUserRepository } from "./repository/authUser.repository";
import { UserService } from "./service/user.service";
import { AuthController } from "./controller/auth.controller";
import { UserController } from "./controller/user.controller";
import { ChatRepository } from "./repository/chat.repository";
import { ChatParticipantRepository } from "./repository/chatParticipant.repository";
import { MessageRepository } from "./repository/message.repository";
import { ChatService } from "./service/chat.service";
import { ChatController } from "./controller/chat.controller";
dotenv.config()


dataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err)=> {
        console.error("Error during Data Source initialization:", err)
    }) 

const userRepository = new UserRepository(dataSource)
const authRepository = new AuthUserRepository(dataSource)
const chatRepository = new ChatRepository(dataSource)
const chatParticipantRepository = new ChatParticipantRepository(dataSource)
const messageRepository = new MessageRepository(dataSource)

const authService = new AuthService(authRepository, userRepository)
const userService = new UserService(userRepository)
const chatService = new ChatService(chatRepository, userRepository, chatParticipantRepository, messageRepository)

// create and setup express app
const app = express()





app.use(express.json())
app.use(cors())

// register routes
new AuthController(app, authService).registerEndpoints()
new UserController(app, userService).registerEndpoints()
new ChatController(app, chatService).registerEndpoints()


// start express server
const server = app.listen(3000)
