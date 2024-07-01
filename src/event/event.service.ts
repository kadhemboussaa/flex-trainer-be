import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createEventDto } from 'src/dtos/create-event.dto';
import { updateEventDto } from 'src/dtos/update-event.dto';
import { eventInterface } from 'src/interface/event.interface';
import { event, eventDocument } from 'src/schema/event.schema';
import { user, userDocument } from 'src/schema/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class eventService {
  constructor(
    @InjectModel('event') private eventModel: Model<eventDocument>,
    @InjectModel('event') private eventInterface: Model<eventInterface>,
    private userService: UserService,
  ) {}

  async createEvent(CreateEventDto: createEventDto): Promise<eventInterface> {
    const newEvent = await new this.eventModel(CreateEventDto);
    return newEvent.save();
  }
  async getAllEvent(): Promise<eventInterface[]> {
    const eventData = await this.eventModel.find().exec();
    if (!eventData || eventData.length == 0) {
      throw new NotFoundException('No events found!');
    }

    const eventsWithCounts = eventData.map((event) => {
      const eventObj = event.toObject();
      eventObj.likesCount = event.likes.length;
      eventObj.dislikesCount = event.dislikes.length;
      return eventObj;
    });

    return eventsWithCounts;
  }

  async getEvent(eventId: string): Promise<eventInterface> {
    const existingEvent = await this.eventModel.findById(eventId).exec();
    if (!existingEvent) {
      throw new NotFoundException(`Event #${eventId} not found!`);
    }
    const eventWithCounts = existingEvent.toObject();
    eventWithCounts.likesCount = existingEvent.likes.length;
    eventWithCounts.dislikesCount = existingEvent.dislikes.length;

    return eventWithCounts;
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

  async like(userId: string, eventId: string) {
    const [user, event] = await this.fetchUserAndEvent(userId, eventId);
    this.validateUserAndEvent(user, event);

    this.removeDislike(user, event, eventId, userId);
    const isNowLiked = this.toggleLike(user, event, eventId, userId);

    await this.saveUserAndEvent(user, event);

    return {
      liked: isNowLiked,
      likesCount: event.likes.length,
      dislikesCount: event.dislikes.length,
    };
  }

  async dislike(userId: string, eventId: string) {
    const [user, event] = await this.fetchUserAndEvent(userId, eventId);
    this.validateUserAndEvent(user, event);

    this.removeLike(user, event, eventId, userId);
    const isNowDisliked = this.toggleDislike(user, event, eventId, userId);

    await this.saveUserAndEvent(user, event);

    return {
      disliked: isNowDisliked,
      likesCount: event.likes.length,
      dislikesCount: event.dislikes.length,
    };
  }

  private removeLike(
    user: user,
    event: event,
    eventId: string,
    userId: string,
  ) {
    const likeIndex = this.findIndexById(user.likes, eventId);
    if (likeIndex !== -1) {
      user.likes.splice(likeIndex, 1);
      event.likes = this.removeItemById(event.likes, userId);
    }
  }

  private toggleDislike(
    user: userDocument,
    event: eventDocument,
    eventId: string,
    userId: string,
  ): boolean {
    const dislikeIndex = this.findIndexById(user.dislikes, eventId);
    if (dislikeIndex !== -1) {
      user.dislikes.splice(dislikeIndex, 1);
      event.dislikes = this.removeItemById(event.dislikes, userId);
      return false;
    } else {
      user.dislikes.push(event._id);
      event.dislikes.push(user._id);
      return true;
    }
  }

  private async fetchUserAndEvent(userId: string, eventId: string) {
    return Promise.all([
      this.userService.getUserById(userId),
      this.eventModel.findById(eventId).exec(),
    ]);
  }

  private validateUserAndEvent(user: user | null, event: event | null) {
    if (!user) throw new NotFoundException('User not found!');
    if (!event) throw new NotFoundException('Event not found!');
  }

  private removeDislike(
    user: user,
    event: event,
    eventId: string,
    userId: string,
  ) {
    const dislikeIndex = this.findIndexById(user.dislikes, eventId);
    if (dislikeIndex !== -1) {
      user.dislikes.splice(dislikeIndex, 1);
      event.dislikes = this.removeItemById(event.dislikes, userId);
    }
  }

  private toggleLike(
    user: userDocument,
    event: eventDocument,
    eventId: string,
    userId: string,
  ): boolean {
    const likeIndex = this.findIndexById(user.likes, eventId);
    if (likeIndex !== -1) {
      user.likes.splice(likeIndex, 1);
      event.likes = this.removeItemById(event.likes, userId);
      return false;
    } else {
      user.likes.push(event._id);
      event.likes.push(user._id);
      return true;
    }
  }

  private findIndexById(array: any[], id: string): number {
    return array.findIndex((item) => item._id.toString() === id);
  }

  private removeItemById(array: any[], id: string): any[] {
    return array.filter((item) => item._id.toString() !== id);
  }

  private async saveUserAndEvent(user: userDocument, event: eventDocument) {
    await Promise.all([event.save(), user.save()]);
  }

  async getSubscribersByLEventId(eventId: string): Promise<any> {
    const lesson = await this.eventModel
      .findById(eventId)
      .populate('subscriptions')
      .exec();
    if (!lesson) {
      throw new NotFoundException(`Event #${eventId} not found!`);
    }
    return lesson;
  }
}
