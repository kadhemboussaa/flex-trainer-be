import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { createTrainingSessionDto } from "src/dtos/create-trainingSession.dto";
import { updateTrainingSessionDto } from "src/dtos/update-trainingSession.dto";
import { trainingSessionInterface } from "src/interface/trainingSession.interface";

@Injectable()
export class trainingSessionService {
    constructor(@InjectModel('trainingSession') private trainingSessionModel: Model<trainingSessionInterface>){}
    
    async createTrainingSession(CreateTrainingSessionDto : createTrainingSessionDto) : Promise<trainingSessionInterface>{
        const newTrainingsession = await new this.trainingSessionModel(CreateTrainingSessionDto);
    return newTrainingsession.save();
    }
    async updateTrainingSession(
        sessionId  : string,
        UpdateTrainingSessionDto : updateTrainingSessionDto,
    ) : Promise <trainingSessionInterface>{
        const existingSession = await this.trainingSessionModel.findByIdAndUpdate(
            sessionId,
            UpdateTrainingSessionDto ,
            {new: true},
        );
        if(!existingSession){
            throw new NotFoundException('session #${packId} not found !');

        }
        return existingSession;
    }
    async getAllTrainingSession():Promise<trainingSessionInterface[]>{
        const sessionData = await this.trainingSessionModel.find();
        if (!sessionData || sessionData.length == 0){
            throw new NotFoundException('session #${packId} not found !')
        }
        return sessionData;
    }
    async getTrainingSession(sessionId: string) : Promise<trainingSessionInterface>{
        const existingSession = await this.trainingSessionModel.findById(sessionId).exec();
        if(!existingSession){
            throw new NotFoundException('session #${packId} not found !');

        }
        return existingSession;
    }
    async deleteTrainingSession(sessionId : string) : Promise<trainingSessionInterface>{
        const deletedSession = await this.trainingSessionModel.findByIdAndDelete(sessionId);
        if (!deletedSession){
            throw new NotFoundException('session #${packId} not found !');
        }
        return deletedSession;
       }
}