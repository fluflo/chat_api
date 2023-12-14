import { Encrypt, generateAccessToken } from "../auth/auth";
import { CreateUserDto } from "../dto/createUser.dto";
import { AuthUserRepository } from "../repository/authUser.repository";
import { UserRepository } from "../repository/user.repository";

export class AuthService {
    authRepository: AuthUserRepository
    userRepository: UserRepository


    constructor(
        authRepository: AuthUserRepository,
        userRepository: UserRepository,
    ){
        this.authRepository = authRepository
        this.userRepository = userRepository

    }
    
    async authenticate(username: string, password: string) :Promise<string | null>{
        const authUser = await this.authRepository.getUserByUsername(username)
        if (authUser && Encrypt.comparePassword(password, authUser.password)
        ){
            return generateAccessToken(authUser.id)
        }

        return null
    }

    async register(user :CreateUserDto){
        const existingUser = await this.authRepository.getUserByUsername(user.username)

        if (existingUser)
            throw Error("User already exists")

        const authUser = await this.authRepository.createUser(
            {
                username: user.username,
                password: await Encrypt.cryptPassword(user.password)
            }
        )

        if (!authUser || !authUser.id)
            throw Error("AuthUser was not created correctly")

        await this.userRepository.createUser({
            authUserId: authUser.id,
            firstName: user.firstName,
            lastName: user.lastName,
            chats: [],
            lastActivity: null
        })
    }
}


