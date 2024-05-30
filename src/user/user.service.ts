import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user, userDocument } from 'src/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { UpdateUSerDto } from 'src/dtos/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<userDocument>,
  ) {}

  async createOne({ email, firstName, lastName, password, role }: user) {
    const newUser = new this.userModel({
      email,
      firstName,
      lastName,
      password: await bcrypt.hash(password, 10),
      role,
    });
    return newUser.save();
  }

  async findByEmail(email: string): Promise<userDocument> {
    return this.userModel.findOne({
      email,
    });
  }
  async getUserById (userId : string) : Promise<userDocument>{
    return this.userModel.findById(userId);
  }
  async getAllUser() :Promise<userDocument []>{
    return this.userModel.find().exec()
  }
  async updateUser(userId : string, updateUserDto : UpdateUSerDto) : Promise <userDocument>{
    const existingUser = this.userModel.findByIdAndUpdate(userId,updateUserDto)
    return existingUser;
  }
  async deleteUser(userId : string): Promise <userDocument>{
    const user = this.userModel.findByIdAndDelete(userId)
    return user;
  }
}
