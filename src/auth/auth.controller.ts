import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AccessJwtAuthGuard } from './guards/access-jwt.guard';
import { Public } from 'src/utils/decorators/public.decorator';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('login')
    @Public()
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    }
    @Post('register')
    @Public()
    register(@Body() registerDto: RegisterDto){
        return this.authService.register(registerDto);
    }

    // guard on route 
    // @Get('info')

   
    @UseGuards(AccessJwtAuthGuard)
    info(){
        return 'ok';
    }

}
