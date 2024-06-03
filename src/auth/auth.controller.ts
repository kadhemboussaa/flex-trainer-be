import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { authService } from './auth.service';
import { LoginDto } from './login.dto';
import { AuthUserRoleGuard } from 'src/guards/auth-user.guard';
import { RegisterUserDto } from 'src/dtos/register-user.dto';
import { Roles } from 'src/decorator/role.decorator';
import { role } from 'src/enum/role.enum';

@Controller('auth')
export class authController {
  constructor(private AuthService: authService) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.AuthService.login(loginDto);
  }

  @Get('/me')
  @UseGuards(AuthUserRoleGuard('*'))
  getMe(@Req() request) {
    return request.user;
  }

 @Post('/register')
 @UseGuards(AuthUserRoleGuard('*'))
 @Roles(role.ADMIN,role.MANAGER)
 registerUser(@Body() registerUserDto : RegisterUserDto){
  return this.AuthService.registerUser(registerUserDto);
 }

}
