"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
var ChatService = /** @class */ (function () {
    function ChatService(chatRepository, userRepository, chatParticipantRepository, messageRepository) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
        this.chatParticipantRepository = chatParticipantRepository;
        this.messageRepository = messageRepository;
    }
    ChatService.prototype.getAllChats = function (currentUserId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.chatRepository.getAllChatsFromUser(currentUserId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ChatService.prototype.getChat = function (currentUserId, chatId) {
        return __awaiter(this, void 0, void 0, function () {
            var chat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.chatRepository.getChat(chatId)];
                    case 1:
                        chat = _a.sent();
                        if (!chat.participants.some(function (participant) { return participant.user.authUserId === currentUserId; })) {
                            throw new Error("User is not part of this chat");
                        }
                        return [2 /*return*/, chat];
                }
            });
        });
    };
    ChatService.prototype.createNewChat = function (currentUserId, recipientUserId) {
        return __awaiter(this, void 0, void 0, function () {
            var newChat, sender, recipient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.doesUserExist(currentUserId)];
                    case 1:
                        if (!(_a.sent())) {
                            throw Error("Sending user doesn't exist");
                        }
                        return [4 /*yield*/, this.userRepository.doesUserExist(recipientUserId)];
                    case 2:
                        if (!(_a.sent())) {
                            throw Error("Recipient user doesn't exist");
                        }
                        return [4 /*yield*/, this.chatRepository.createNewChat()];
                    case 3:
                        newChat = _a.sent();
                        return [4 /*yield*/, this.userRepository.getUserById(currentUserId)];
                    case 4:
                        sender = _a.sent();
                        return [4 /*yield*/, this.userRepository.getUserById(recipientUserId)];
                    case 5:
                        recipient = _a.sent();
                        return [4 /*yield*/, this.chatParticipantRepository.addChatParticipant(newChat, sender)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.chatParticipantRepository.addChatParticipant(newChat, recipient)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatService.prototype.sendMessageToChat = function (currentUserId, chatId, message) {
        return __awaiter(this, void 0, void 0, function () {
            var recipients;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.chatRepository.checkIfChatExists(chatId)];
                    case 1:
                        if (!(_a.sent())) {
                            throw Error("Chat doesn't exists");
                        }
                        return [4 /*yield*/, this.chatParticipantRepository
                                .getChatParticipantsWithoutCurrentUser(chatId, currentUserId)];
                    case 2:
                        recipients = _a.sent();
                        return [4 /*yield*/, this.messageRepository.createNewMessageInChat(chatId, message, currentUserId)];
                    case 3:
                        _a.sent();
                        Promise.all(recipients.map(function (recipient) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.chatParticipantRepository.increaseUnreadMessagesForRecipient(chatId, recipient)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }));
                        return [4 /*yield*/, this.chatRepository.updateChatActivity(chatId)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.userRepository.updateLastActivity(currentUserId)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ChatService;
}());
exports.ChatService = ChatService;
