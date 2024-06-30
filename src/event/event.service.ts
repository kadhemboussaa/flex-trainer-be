import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createEventDto } from 'src/dtos/create-event.dto';
import { updateEventDto } from 'src/dtos/update-event.dto';
import { eventInterface } from 'src/interface/event.interface';
import { event, eventDocument } from 'src/schema/event.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class eventService {
  constructor(
    @InjectModel('event') private eventModel: Model<eventDocument>,
    private userService: UserService,
  ) {}

  async createEvent(CreateEventDto: createEventDto): Promise<eventInterface> {
    const newEvent = await new this.eventModel(CreateEventDto);
    return newEvent.save();
  }
  async getAllEvent(): Promise<eventInterface[]> {
    const eventData = await this.eventModel.find();
    if (!eventData || eventData.length == 0) {
      throw new NotFoundException('Gym #${packId} not found !');
    }
    return eventData;
  }
  async getEvent(eventId: string): Promise<eventInterface> {
    const existingEvent = await this.eventModel.findById(eventId).exec();
    if (!existingEvent) {
      throw new NotFoundException('event #${packId} not found !');
    }
    return existingEvent;
  }
  async deleteEvent(eventId: string): Promise<eventInterface> {
    const deletedEvent = await this.eventModel.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      throw new NotFoundException('event #${packId} not found !');
    }
    return deletedEvent;
  }
  async updateEvent(
    gymId: string,
    UpdateEventDto: updateEventDto,
  ): Promise<eventInterface> {
    const existingEvent = await this.eventModel.findByIdAndUpdate(
      gymId,
      UpdateEventDto,
      { new: true },
    );
    if (!existingEvent) {
      throw new NotFoundException('gym #${packId} not found !');
    }
    return existingEvent;
  }

  async subscribe(userId, courseId) {
    const event = await this.eventModel.findById(courseId).exec();
    if (!event) {
      throw new NotFoundException('not found !');
    }
    const existingUser = await this.userService.getUserById(userId);
    if (!existingUser) {
      throw new NotFoundException('not found !');
    }
    event.subscriptions.push(existingUser._id);
    existingUser.eventSubscriptions.push(event._id);
    event.save();
    existingUser.save();
  }

  async like(userId: string, eventId) {
    const event = await this.eventModel.findById(eventId).exec();
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
}
