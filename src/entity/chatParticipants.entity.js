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
exports.ChatParticipant = void 0;
var typeorm_1 = require("typeorm");
var chat_entity_1 = require("./chat.entity");
var user_entity_1 = require("./user.entity");
var ChatParticipant = /** @class */ (function () {
    function ChatParticipant() {
        this.unreadMessages = 0;
    }
    ChatParticipant.prototype.newid = function () {
        this.userId = this.user.authUserId;
        this.chatId = this.chat.chatId;
    };
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", Number)
    ], ChatParticipant.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.chats; }, { onDelete: 'CASCADE' }),
        (0, typeorm_1.JoinColumn)({ name: "userId", referencedColumnName: "authUserId" }),
        __metadata("design:type", user_entity_1.User)
    ], ChatParticipant.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ChatParticipant.prototype, "newid", null);
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", Number)
    ], ChatParticipant.prototype, "chatId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return chat_entity_1.Chat; }, function (chat) { return chat.participants; }, { onDelete: 'CASCADE' }),
        (0, typeorm_1.JoinColumn)({ name: "chatId", referencedColumnName: "chatId" }),
        __metadata("design:type", chat_entity_1.Chat)
    ], ChatParticipant.prototype, "chat", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], ChatParticipant.prototype, "unreadMessages", void 0);
    ChatParticipant = __decorate([
        (0, typeorm_1.Entity)()
    ], ChatParticipant);
    return ChatParticipant;
}());
exports.ChatParticipant = ChatParticipant;
