import { UserRepository } from "../repository/user.repository";

export class UserService {
    userRepository: UserRepository
    constructor(
        userRepository: UserRepository
    ) {
        this.userRepository = userRepository
    }

    async getAllUsers(keepCurrent :boolean, currentUserId :number){
        if (keepCurrent){
            return await this.userRepository.getAllUsers()
        }

        return await this.userRepository.getAllUsersExcept(currentUserId)
    }

    async getUser(userId :number){
        return await this.userRepository.getUserById(userId)
    }
}