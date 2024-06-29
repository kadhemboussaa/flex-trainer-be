import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { createEventDto } from "src/dtos/create-event.dto";
import { updateEventDto } from "src/dtos/update-event.dto";
import { eventInterface } from "src/interface/event.interface";

@Injectable()
export class eventService {
    constructor(@InjectModel('event') private eventModel: Model<eventInterface>){}
    
    async createEvent(CreateEventDto : createEventDto) : Promise<eventInterface>{
        const newEvent = await new this.eventModel(CreateEventDto);
    return newEvent.save();
    }
    async getAllEvent():Promise<eventInterface[]>{
        const eventData = await this.eventModel.find();
        if (!eventData || eventData.length == 0){
            throw new NotFoundException('Gym #${packId} not found !')
        }
        return eventData;
    }
    async getEvent(eventId: string) : Promise<eventInterface>{
        const existingEvent = await this.eventModel.findById(eventId).exec();
        if(!existingEvent){
            throw new NotFoundException('event #${packId} not found !');

        }
        return existingEvent;
    }
    async deleteEvent(eventId : string) : Promise<eventInterface>{
        const deletedEvent = await this.eventModel.findByIdAndDelete(eventId);
        if (!deletedEvent){
            throw new NotFoundException('event #${packId} not found !');
        }
        return deletedEvent;
       }
       async updateEvent(
        gymId  : string,
        UpdateEventDto : updateEventDto,
    ) : Promise <eventInterface>{
        const existingEvent = await this.eventModel.findByIdAndUpdate(
            gymId,
            UpdateEventDto ,
            {new: true},
        );
        if(!existingEvent){
            throw new NotFoundException('gym #${packId} not found !');

        }
        return existingEvent;
    }   
}