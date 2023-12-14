import { Entity, Column, PrimaryColumn, OneToOne, ManyToMany, Timestamp, CreateDateColumn, OneToMany } from "typeorm"
import { AuthUser } from "./authUser.entity"
import { ChatParticipant } from "./chatParticipants.entity"

@Entity()
export class User {
    @PrimaryColumn()
    @OneToOne(() => AuthUser, (user) => user.id)
    authUserId: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @OneToMany(() => ChatParticipant, (participant) => participant.user)
    chats :ChatParticipant[]

    @CreateDateColumn({ nullable: true })
    lastActivity?: Date
}