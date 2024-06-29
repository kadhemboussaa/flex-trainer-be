import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { authService } from './auth.service';
import { LoginDto } from './login.dto';
import { AuthUserRoleGuard } from 'src/guards/auth-user.guard';
import { RegisterUserDto } from 'src/dtos/register-user.dto';
import { Roles } from 'src/decorator/role.decorator';
import { role } from 'src/enum/role.enum';
import { UpdateUSerDto } from 'src/dtos/updateUser.dto';
import { UserService } from 'src/user/user.service';
import { BaseUserDto } from 'src/dtos/create-base-user.dto';
import { user } from 'src/schema/user.schema';

@Controller('auth')
export class authController {
  constructor(
    private AuthService: authService,
    private UserService: UserService,
  ) {}

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
  @Roles(role.ADMIN, role.MANAGER)
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.AuthService.registerUser(registerUserDto);
  }

  @Post('/createUser')
  @UseGuards(AuthUserRoleGuard('*'))
  @Roles(role.ADMIN, role.MANAGER)
  createUser(@Body() baseUserDto: user) {
    return this.UserService.createOne(baseUserDto);
  }

  @Put('/edit-profile')
  @UseGuards(AuthUserRoleGuard('*'))
  @Roles(role.ADMIN, role.MANAGER, role.CLIENT, role.COACH)
  updateUser(@Body() updateUserDto: UpdateUSerDto, userId) {
    return this.AuthService.updateUser(userId, updateUserDto);
  }
}
