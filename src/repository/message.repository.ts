import {  DataSource, Repository } from "typeorm";
import { Message } from "../entity/message.entity";

export class MessageRepository {
    repository: Repository<Message>
    constructor(dataSource: DataSource){
        this.repository = dataSource.getRepository(Message)
    }

    async createNewMessageInChat(chatId :number, message :string, senderUserId :number) :Promise<void> {
        await this.repository.save({
            chatId: chatId,
            message: message,
            senderId: senderUserId,
            sendDate: new Date()
        })
    }




}