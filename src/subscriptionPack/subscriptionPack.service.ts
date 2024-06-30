import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createSubscriptionPackDto } from 'src/dtos/create-subscriptionPack.dto';
import { updateSubscriptionPackDto } from 'src/dtos/update-SubscriptionPack.dto';
import {
  SubscriptionPack,
  SubscriptionPackDocument,
} from 'src/schema/subscriptionPack.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class subscriptionPackService {
  constructor(
    @InjectModel('SubscriptionPack')
    private subscriptionPackModel: Model<SubscriptionPackDocument>,
    private userService: UserService,
  ) {}

  async createSubscriptionPack(
    CreateSubscriptionPackDto: createSubscriptionPackDto,
  ): Promise<SubscriptionPack> {
    const newSubscriptionpack = await new this.subscriptionPackModel(
      CreateSubscriptionPackDto,
    );
    return newSubscriptionpack.save();
  }
  async updateSubscriptionPack(
    packId: string,
    UpdateSubscriptionPackDto: updateSubscriptionPackDto,
  ): Promise<SubscriptionPack> {
    const existingPack = await this.subscriptionPackModel.findByIdAndUpdate(
      packId,
      UpdateSubscriptionPackDto,
      { new: true },
    );
    if (!existingPack) {
      throw new NotFoundException('pack #${packId} not found !');
    }
    return existingPack;
  }
  async getAllSubscriptionPack(): Promise<SubscriptionPack[]> {
    const packData = await this.subscriptionPackModel.find();
    if (!packData || packData.length == 0) {
      throw new NotFoundException('pack #${packId} not found !');
    }
    return packData;
  }
  async getSubscriptionPack(packId: string): Promise<SubscriptionPack> {
    const existingPack = await this.subscriptionPackModel
      .findById(packId)
      .exec();
    if (!existingPack) {
      throw new NotFoundException('pack #${packId} not found !');
    }
    return existingPack;
  }
  async deleteSubscriptionPack(packId: string): Promise<SubscriptionPack> {
    const deletedPack = await this.subscriptionPackModel.findByIdAndDelete(
      packId,
    );
    if (!deletedPack) {
      throw new NotFoundException('pack #${packId} not found !');
    }
    return deletedPack;
  }

  async subscribe(userId, packId) {
    const existingPack = await this.subscriptionPackModel
      .findById(packId)
      .exec();
    if (!existingPack) {
      throw new NotFoundException('not found !');
    }
    const existingUser = await this.userService.getUserById(userId);
    if (!existingUser) {
      throw new NotFoundException('not found !');
    }
    existingPack.userSub.push(existingUser._id);
    existingUser.subpack.push(existingPack._id);
    existingPack.save();
    existingUser.save();
  }
}
