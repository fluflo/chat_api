import { ArrayContainedBy, ArrayContains, DataSource, In, Repository } from "typeorm";
import { Chat } from "../entity/chat.entity";
import { Message } from "../entity/message.entity";

export class ChatRepository {
    repository: Repository<Chat>
    constructor(dataSource: DataSource){
        this.repository = dataSource.getRepository(Chat)
    }

    async getChat(chatId :number): Promise<Chat>{
        return await this.repository.findOne({
            relations:{
                participants: {
                    user: true
                },
                messages: true
            },
            where: {
                chatId: chatId
            }
        })
    }

    async getAllChatsFromUser(userId :number): Promise<Chat[]>{
        return await this.repository.find({
            relations:{
                participants: true
            },
            where: {
                participants: {
                    user: {
                        authUserId: userId
                    }
                } 
            },
            order: {
                lastActivity: "DESC"
            }
        })
    }

    async checkIfChatExists(chatId :number) :Promise<boolean> {
        return await this.repository.exist({
            where: {
                chatId: chatId
            }
        })
    }

    async checkIfChatExistsForParticipants(...participants :number[]) :Promise<boolean> {
        return await this.repository.exist({
            relations: {
                participants: true
            },
            where: {
                participants: {
                    userId: ArrayContainedBy(participants) && ArrayContains(participants)
                }
            }
        }
        )
    }

    // async checkIfChatExistsForParticipants(...participants :number[]) :Promise<boolean> {
    //     return await this.repository.createQueryBuilder("chat")
    //     .leftJoin("chat.chatId", "participant", "chat.chatId == participant.chatId")
    //     .where("participants.userId <@ :participants AND participants.userId >@ :participants", { participants: participants })
    //     .getExists()
    // }

    async createNewChat(
    ) :Promise<Chat>{
        return await this.repository.save({})
    }

    async getAllMessagesInChat(chatId :number) :Promise<Message[]>{
        return await this.repository.find({
            relations:{
                messages: true
            },
            where: {
                chatId: chatId
            },
            order: {
                messages:{
                    sendDate: "DESC"
                }
            }
        }).then((chats) => chats.flatMap(chat => chat.messages))
    }

    async updateChatActivity(chatId :number) :Promise<void>{
        const chat = await this.repository.findOne({
            where: {
                chatId: chatId
            }
        })
        chat.lastActivity = new Date()

        await this.repository.update({
            chatId: chatId
        },chat)
    }


}