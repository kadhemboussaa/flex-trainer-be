import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from 'src/dtos/register-user.dto';
import { role } from 'src/enum/role.enum';
import { UserService } from 'src/user/user.service';
import { AuthReponse } from './auth-response.type';
import { LoginDto } from './login.dto';
import { UpdateUSerDto } from 'src/dtos/updateUser.dto';
import { userDocument } from 'src/schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class authService implements OnModuleInit {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    @InjectModel('user') private readonly userModel: Model<userDocument>,
  ) {}

  async onModuleInit() {
    try {
      await this.userService.createOne({
        email: 'superuser@mail.com',
        firstName: 'superuser',
        lastName: 'super',
        password: 'Test@123',
        role: role.ADMIN,
      });
      Logger.verbose('INIT USER CREATED SUCCESSFULY');
    } catch (err) {
      Logger.verbose('INIT USER ALREADY EXISTS');
    }
  }

  async login({ email, password }: LoginDto): Promise<AuthReponse> {
    const foundUser = await this.userService.findByEmail(email);
    if (foundUser) {
      if (await bcrypt.compare(password, foundUser.password)) {
        const userAsObject = foundUser.toObject();
        delete userAsObject.password;

        return {
          token: await this.jwtService.signAsync(userAsObject),
          user: userAsObject,
        };
      }
      throw new UnauthorizedException('Incorrect password');
    }

    throw new UnauthorizedException('User with this email does not exists');
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 20);
  }

  async registerUser(registerUserDto: RegisterUserDto): Promise<AuthReponse> {
    try {
      const createdUser = await this.userService.createOne(registerUserDto);
      const userAsObject = createdUser.toObject();
      delete userAsObject.password;
      return {
        token: await this.jwtService.signAsync(userAsObject),
        user: userAsObject,
      };
    } catch (err) {
      throw new BadRequestException('User with that email already exists');
    }
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUSerDto,
  ): Promise<userDocument> {
    const existingUser = this.userModel
      .findByIdAndUpdate(userId, updateUserDto, { new: true })
      .exec();
    if (!existingUser) {
      throw new NotFoundException('session #${packId} not found !');
    }
    return existingUser;
  }

  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
    }
  }
}
