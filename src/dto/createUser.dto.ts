import { IsAlpha, IsString, Length } from "class-validator"

export class CreateUserDto {
    @IsString()
    username: string
    
    @IsString()
    @Length(5)
    password: string

    @IsAlpha()
    firstName: string

    @IsAlpha()
    lastName: string
}