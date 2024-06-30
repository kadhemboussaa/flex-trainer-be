import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createCollectiveLessonDto } from 'src/dtos/create-collectiveLesson.dto';
import { updateCollectiveLessonDto } from 'src/dtos/update-collectiveLesson.dto';
import { collectiveLessonInterface } from 'src/interface/collectiveLesson.interface';
import { collectiveLessonDocument } from 'src/schema/collectiveLesson.schema';
import { userDocument } from 'src/schema/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class collectiveLessonService {
  constructor(
    @InjectModel('collectiveLesson')
    private collectiveLessonModel: Model<collectiveLessonDocument>,
    @InjectModel('user') private userModel: Model<userDocument>,
    private userService: UserService,
  ) {}

  async createCollectiveLesson(
    CreateCollectiveLessonDto: createCollectiveLessonDto,
  ): Promise<collectiveLessonInterface> {
    const newLesson = await new this.collectiveLessonModel(
      CreateCollectiveLessonDto,
    );
    return newLesson.save();
  }
  async updateCollectiveLesson(
    lessonId: string,
    UpdateCollectiveLessonDto: updateCollectiveLessonDto,
  ): Promise<collectiveLessonInterface> {
    const existingLesson = await this.collectiveLessonModel.findByIdAndUpdate(
      lessonId,
      UpdateCollectiveLessonDto,
      { new: true },
    );
    if (!existingLesson) {
      throw new NotFoundException('session #${packId} not found !');
    }
    return existingLesson;
  }
  async getAllCollectiveLesson(): Promise<collectiveLessonInterface[]> {
    const lessonData = await this.collectiveLessonModel.find();
    if (!lessonData || lessonData.length == 0) {
      throw new NotFoundException('session #${packId} not found !');
    }
    return lessonData;
  }
  async getCollectiveLesson(
    lessonId: string,
  ): Promise<collectiveLessonInterface> {
    const existingLesson = await this.collectiveLessonModel
      .findById(lessonId)
      .exec();
    if (!existingLesson) {
      throw new NotFoundException('session #${packId} not found !');
    }
    return existingLesson;
  }
  async deleteCollectiveLesson(
    lessonId: string,
  ): Promise<collectiveLessonInterface> {
    const deletedLesson = await this.collectiveLessonModel.findByIdAndDelete(
      lessonId,
    );
    if (!deletedLesson) {
      throw new NotFoundException('session #${packId} not found !');
    }
    return deletedLesson;
  }
  async subscribe(userId, courseId) {
    const existingLesson = await this.collectiveLessonModel
      .findById(courseId)
      .exec();
    if (!existingLesson) {
      throw new NotFoundException('not found !');
    }
    const existingUser = await this.userService.getUserById(userId);
    if (!existingUser) {
      throw new NotFoundException('not found !');
    }
    existingLesson.subscribers.push(existingUser._id);
    existingUser.subscriptions.push(existingLesson._id);
    existingLesson.save();
    existingUser.save();
  }

  async like(userId: string, eventId) {
    const event = await this.collectiveLessonModel.findById(eventId).exec();
    if (!event) {
      throw new NotFoundException('not found !');
    }
    const existingUser = await this.userService.getUserById(userId);
    if (!existingUser) {
      throw new NotFoundException('not found !');
    }
    event.likes.push(existingUser._id);
    existingUser.likes.push(event._id);
    event.save();
    existingUser.save();
  }

  async getSubscribersByLessonId(lessonId: string): Promise<any> {
    const lesson = await this.collectiveLessonModel
      .findById(lessonId)
      .populate('subscribers')
      .exec();
    if (!lesson) {
      throw new NotFoundException(`Collective lesson #${lessonId} not found!`);
    }
    return lesson;
  }
}
