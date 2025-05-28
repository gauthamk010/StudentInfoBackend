// auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO, LoginDTO } from './DTO/auth.dto';

@Controller('user')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/register')
    async signup(@Body() registerDto: RegisterDTO): Promise<{ token: string }> {
        return this.authService.Register(registerDto);
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDTO: LoginDTO): Promise<{ token: string }> {
        return this.authService.Login(loginDTO);
    }
}