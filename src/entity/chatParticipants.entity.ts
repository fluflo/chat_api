import { BeforeInsert, Column, Entity,  JoinColumn,  ManyToOne, PrimaryColumn } from "typeorm";
import { Chat } from "./chat.entity";
import { User } from "./user.entity";

@Entity()
export class ChatParticipant{
    @PrimaryColumn()
    userId: number
    @ManyToOne(() => User, (user) => user.chats, {onDelete: 'CASCADE'})
    @JoinColumn({name:"userId", referencedColumnName: "authUserId"})
    user: User

    @BeforeInsert()
    newid() { 
        this.userId = this.user.authUserId 
        this.chatId = this.chat.chatId
    }

    @PrimaryColumn()
    chatId: number

    @ManyToOne(() => Chat, (chat) => chat.participants, {onDelete: 'CASCADE'})
    @JoinColumn({name:"chatId", referencedColumnName: "chatId"})
    chat :Chat


    @Column()
    unreadMessages :number = 0
}