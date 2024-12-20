import { PickType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";


export class LoginDto extends PickType(CreateUserDto,['email','password']){}
