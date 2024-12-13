import {  IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    readonly firstname: string


    @IsNotEmpty()
    @IsString()
    readonly lastname: string
}
