import { IsNotEmpty, IsString } from "class-validator";


export class RegisterDto{

    @IsNotEmpty()
    @IsString()
    readonly email: string

    @IsNotEmpty()
    @IsString()
    readonly password: string

    readonly firstname: string

    readonly lastname: string
}