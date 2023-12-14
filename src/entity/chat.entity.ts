import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, Timestamp, CreateDateColumn, JoinTable } from "typeorm"
import { Message } from "./message.entity"
import { ChatParticipant } from "./chatParticipants.entity"

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    chatId :number

    @Column({ nullable: true })
    socketId? :number

    @OneToMany(() => ChatParticipant, chatParticipant => chatParticipant.chat)
    participants? :ChatParticipant[]

    @OneToMany(() => Message, (message) => message.chatId, { nullable: true })
    messages? :Message[]|null

    @CreateDateColumn({ nullable: true })
    lastActivity? :Date
}