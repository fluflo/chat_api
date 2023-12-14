import { DataSource, Repository, UpdateResult } from "typeorm";
import { AuthUser } from "../entity/authUser.entity";

export class AuthUserRepository {
    repository: Repository<AuthUser>
    constructor(dataSource: DataSource){
        this.repository = dataSource.getRepository(AuthUser)
    }

    async getAllUsers(): Promise<AuthUser[]>{
        return await this.repository.find()
    }

    async getUserById(id: number): Promise<AuthUser>{
        return await this.repository.findOneBy({
            id: id
        })
    }

    async getUserByUsername(username: string): Promise<AuthUser>{
        return await this.repository.findOneBy({
            username: username
        })
    }

    async createUser(user: AuthUser): Promise<AuthUser>{
        return await this.repository.save(user)
    }

    async updatePassword(user: AuthUser) : Promise<void>{
        await this.repository.update({
            id: user.id
        },user)
    }
}