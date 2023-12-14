import { Entity, Column, Timestamp, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"
import { User } from "./user.entity"
import { Chat } from "./chat.entity"

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    messageId :number

    @ManyToOne(() => Chat)
    chatId :number


    @ManyToOne(() => User)
    senderId :number

    @CreateDateColumn()
    sendDate :Date

    @Column()
    message: string
}