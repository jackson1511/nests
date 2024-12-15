import {  IsNotEmpty, IsString } from "class-validator";
import { Role } from "../entities/role.enum";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    readonly firstname: string


    @IsNotEmpty()
    @IsString()
    readonly lastname: string

    @IsNotEmpty()
    @IsString()
    readonly email: string

    @IsNotEmpty()
    @IsString()
    readonly password: string

}
