import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class AuthUser {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    username: string

    @Column()
    password: string
}