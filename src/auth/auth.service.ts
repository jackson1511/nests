import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService, 
        private readonly jwtService: JwtService
    ){}

    async login(loginDto: LoginDto){
        const userExist =  this.userService.findOneByEmail(loginDto.email);

        if(!userExist){
            throw new BadRequestException("Invalid email or password");
        }

        const passwordMatch = await this.userService.compareHash(
            loginDto.password,
            (await userExist).password
        )
        
        if(!passwordMatch){
            throw new BadRequestException("Invalide email or password");
        }

        // generate token 
        const token = await this.jwtService.signAsync({
            userId: (await userExist).id
        })

        if(!token){
            throw new BadRequestException("Invalid email or password")
        }

        return {
            "access_token": token,
            "token_type": "bearer"
        };
    }

    async register(registerDto: RegisterDto){

        const userExist = await this.userService.findOneByEmail(registerDto.email);

        if(userExist){
            throw new BadRequestException("User already exist")
        }

        const newUser = await this.userService.create(registerDto);

        if(!newUser){
            throw new BadRequestException("register failed.")
        }

        // generate token 
        const token = await this.jwtService.signAsync({
            userId: newUser.id
        })

        if(!token){
            throw new BadRequestException("Invalid email or password")
        }

        return {
            "user": newUser,
            "access_token": token,
            "token_type": "bearer"
        };
    }
}
