"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
var typeorm_1 = require("typeorm");
var message_entity_1 = require("./message.entity");
var chatParticipants_entity_1 = require("./chatParticipants.entity");
var Chat = /** @class */ (function () {
    function Chat() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Chat.prototype, "chatId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Number)
    ], Chat.prototype, "socketId", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return chatParticipants_entity_1.ChatParticipant; }, function (chatParticipant) { return chatParticipant.chat; }),
        __metadata("design:type", Array)
    ], Chat.prototype, "participants", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return message_entity_1.Message; }, function (message) { return message.chatId; }, { nullable: true }),
        __metadata("design:type", Array)
    ], Chat.prototype, "messages", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ nullable: true }),
        __metadata("design:type", Date)
    ], Chat.prototype, "lastActivity", void 0);
    Chat = __decorate([
        (0, typeorm_1.Entity)()
    ], Chat);
    return Chat;
}());
exports.Chat = Chat;
