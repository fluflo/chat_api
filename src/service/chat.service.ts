import { Chat } from "../entity/chat.entity"
import { ChatRepository } from "../repository/chat.repository"
import { ChatParticipantRepository } from "../repository/chatParticipant.repository"
import { MessageRepository } from "../repository/message.repository"
import { UserRepository } from "../repository/user.repository"

export class ChatService{
    chatRepository: ChatRepository
    userRepository: UserRepository
    chatParticipantRepository: ChatParticipantRepository
    messageRepository: MessageRepository

    constructor(
        chatRepository: ChatRepository,
        userRepository: UserRepository,
        chatParticipantRepository: ChatParticipantRepository,
        messageRepository: MessageRepository
    ){
        this.chatRepository = chatRepository
        this.userRepository = userRepository
        this.chatParticipantRepository = chatParticipantRepository
        this.messageRepository = messageRepository
    }

    async getAllChats(currentUserId :number) :Promise<Chat[]> {
        return await this.chatRepository.getAllChatsFromUser(currentUserId)
    }


    async getChat(currentUserId :number, chatId :number) :Promise<Chat> {
        const chat = await this.chatRepository.getChat(chatId)
        if (!chat.participants.some((participant) => participant.user.authUserId === currentUserId)){
            throw new Error("User is not part of this chat")
        }

        return chat
    }



    async createNewChat(currentUserId :number, recipientUserId:number) :Promise<void> {
        if (!(await this.userRepository.doesUserExist(currentUserId))){
            throw Error("Sending user doesn't exist")
        }

        if (!(await this.userRepository.doesUserExist(recipientUserId))){
            throw Error("Recipient user doesn't exist")
        }

        // if (await this.chatRepository.checkIfChatExistsForParticipants(currentUserId, recipientUserId)){
        //     throw Error("Chat already exists")
        // }

        const newChat = await this.chatRepository.createNewChat()
        const sender = await this.userRepository.getUserById(currentUserId)
        const recipient = await this.userRepository.getUserById(recipientUserId)

        await this.chatParticipantRepository.addChatParticipant(newChat, sender)
        await this.chatParticipantRepository.addChatParticipant(newChat, recipient)
    }

    async sendMessageToChat(currentUserId :number, chatId :number, message :string) :Promise<void>{
        if (!(await this.chatRepository.checkIfChatExists(chatId))){
            throw Error("Chat doesn't exists")
        }    
        
        const recipients = await this.chatParticipantRepository
                                        .getChatParticipantsWithoutCurrentUser(chatId, currentUserId)
        
        
        await this.messageRepository.createNewMessageInChat(chatId, message, currentUserId)

        Promise.all(recipients.map(async recipient => {
            await this.chatParticipantRepository.increaseUnreadMessagesForRecipient(chatId, recipient)
        }))
        await this.chatRepository.updateChatActivity(chatId)
        await this.userRepository.updateLastActivity(currentUserId);
    }
}