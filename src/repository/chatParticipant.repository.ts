import { DataSource, Not, Repository } from "typeorm";
import { ChatParticipant } from "../entity/chatParticipants.entity";
import { Chat } from "../entity/chat.entity";
import { User } from "../entity/user.entity";

export class ChatParticipantRepository {
    repository: Repository<ChatParticipant>
    constructor(dataSource: DataSource){
        this.repository = dataSource.getRepository(ChatParticipant)
    }

    async addChatParticipant(
        chat :Chat,
        user :User
    ) :Promise<void>{
        await this.repository.save({
            chat: chat,
            user: user,
            unreadMessages: 0
        })
    }

    async getChatParticipantsWithoutCurrentUser(
        chatId :number,
        currentUserId :number
    ) :Promise<number[]> {
        return await this.repository.find({
            relations: {
                chat: true,
                user: true
            },
            where: {
                chat: {
                    chatId: chatId
                },
                user: {
                    authUserId: Not(currentUserId)
                }
            },
            select: {
                user: {
                    authUserId: true
                }
            }
        }).then(participants => participants.flatMap(participant => participant.user.authUserId))
    }


    async increaseUnreadMessagesForRecipient(
        chatId :number,
        userId :number
    ) :Promise<void>{
        const chatParticipation = await this.repository.findOne({
            relations: {
                chat: true,
                user: true
            },
            where: {
                chat: {
                    chatId: chatId
                },
                user: {
                    authUserId: userId
                }
            },
        })
        chatParticipation.unreadMessages += 1
        await this.repository.save(chatParticipation)
    }

    async resetUnreadMessagesForRecipient(
        chatId :number,
        userId :number
    ) :Promise<void>{
        const chatParticipation = await this.repository.findOne({
            relations: {
                chat: true,
                user: true
            },
            where: {
                chat: {
                    chatId: chatId
                },
                user: {
                    authUserId: userId
                }
            },
        })
        chatParticipation.unreadMessages = 0
        await this.repository.save(chatParticipation)
    }


}