// auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO, LoginDTO } from './DTO/auth.dto';

@Controller('user')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    async signup(@Body() signupDTO: SignupDTO): Promise<{ token: string }> {
        return this.authService.SignUp(signupDTO);
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDTO: LoginDTO): Promise<{ token: string }> {
        return this.authService.Login(loginDTO);
    }
}