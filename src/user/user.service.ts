import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { FilterQuery, Model } from 'mongoose';
import { user, userDocument } from 'src/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { UpdateUSerDto } from 'src/dtos/updateUser.dto';
import { coachClientDocument } from 'src/schema/coachClient.schema';
//import { role } from 'src/enum/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<userDocument>,
    @InjectModel('coachClient')
    private readonly coachClientModel: Model<coachClientDocument>,
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

  async createCoachClient(clientId: string, coachId: string) {
    const existingCoachClient = await this.coachClientModel.findOne({
      coach: new mongoose.Types.ObjectId(coachId),
      client: new mongoose.Types.ObjectId(clientId),
    });

    if (existingCoachClient) {
      // Return the existing document or handle as needed
      return existingCoachClient;
    }

    // Create a new document if it doesn't exist
    const newCoachClient = new this.coachClientModel({
      coach: new mongoose.Types.ObjectId(coachId),
      client: new mongoose.Types.ObjectId(clientId),
    });

    return newCoachClient.save();
  }

  async findByEmail(email: string): Promise<userDocument> {
    return this.userModel.findOne({
      email,
    });
  }
  async getUserById(userId: string): Promise<userDocument> {
    return this.userModel.findById(userId).populate('subpack');
  }
  async getAllUser(): Promise<userDocument[]> {
    return this.userModel.find().exec();
  }
  async getAllClients(): Promise<userDocument[]> {
    return this.userModel.find({ role: 'client' }).exec();
  }
  async getAllManagers(): Promise<userDocument[]> {
    return this.userModel.find({ role: 'manager' }).exec();
  }
  async getAllCoaches(): Promise<userDocument[]> {
    return this.userModel.find({ role: 'coach' }).exec();
  }
  async updateUser(
    userId: string,
    updateUserDto: UpdateUSerDto,
  ): Promise<userDocument> {
    const existingUser = this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );
    return existingUser;
  }
  async deleteUser(userId: string): Promise<userDocument> {
    const user = this.userModel.findByIdAndDelete(userId);
    return user;
  }
  async getAllClientCoach(coachId: string): Promise<coachClientDocument[]> {
    return this.coachClientModel
      .find({
        coach: new mongoose.Types.ObjectId(coachId),
      })
      .populate({ path: 'client', select: '-password' });
  }
}
