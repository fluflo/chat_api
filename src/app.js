"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var dotenv = require("dotenv");
var data_source_1 = require("./data-source");
var user_repository_1 = require("./repository/user.repository");
var auth_service_1 = require("./service/auth.service");
var authUser_repository_1 = require("./repository/authUser.repository");
var user_service_1 = require("./service/user.service");
var auth_controller_1 = require("./controller/auth.controller");
var user_controller_1 = require("./controller/user.controller");
var chat_repository_1 = require("./repository/chat.repository");
var chatParticipant_repository_1 = require("./repository/chatParticipant.repository");
var message_repository_1 = require("./repository/message.repository");
var chat_service_1 = require("./service/chat.service");
var chat_controller_1 = require("./controller/chat.controller");
dotenv.config();
data_source_1.default
    .initialize()
    .then(function () {
    console.log("Data Source has been initialized!");
})
    .catch(function (err) {
    console.error("Error during Data Source initialization:", err);
});
var userRepository = new user_repository_1.UserRepository(data_source_1.default);
var authRepository = new authUser_repository_1.AuthUserRepository(data_source_1.default);
var chatRepository = new chat_repository_1.ChatRepository(data_source_1.default);
var chatParticipantRepository = new chatParticipant_repository_1.ChatParticipantRepository(data_source_1.default);
var messageRepository = new message_repository_1.MessageRepository(data_source_1.default);
var authService = new auth_service_1.AuthService(authRepository, userRepository);
var userService = new user_service_1.UserService(userRepository);
var chatService = new chat_service_1.ChatService(chatRepository, userRepository, chatParticipantRepository, messageRepository);
// create and setup express app
var app = express();
app.use(express.json());
// register routes
new auth_controller_1.AuthController(app, authService).registerEndpoints();
new user_controller_1.UserController(app, userService).registerEndpoints();
new chat_controller_1.ChatController(app, chatService).registerEndpoints();
// start express server
var server = app.listen(3000);
