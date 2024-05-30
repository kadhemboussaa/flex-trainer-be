import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { createProgressDto } from "src/dtos/create-progress.dto";
import { updateProgressDto } from "src/dtos/update-progress.dto";
import { progressInterface } from "src/interface/progress.interface";

@Injectable()
export class progressService {
    constructor(@InjectModel('progress') private progressModel: Model<progressInterface>){}
    
    async createProgress(CreateProgressDto : createProgressDto) : Promise<progressInterface>{
        const newProgress = await new this.progressModel(CreateProgressDto);
    return newProgress.save();
    }
    async updateProgress(
        progressId  : string,
        UpdateProgressDto : updateProgressDto,
    ) : Promise <progressInterface>{
        const existingProgress = await this.progressModel.findByIdAndUpdate(
            progressId,
            UpdateProgressDto ,
            {new: true},
        );
        if(!existingProgress){
            throw new NotFoundException('progress #${packId} not found !');

        }
        return existingProgress;
    }
    async getAllProgress():Promise<progressInterface[]>{
        const progressData = await this.progressModel.find();
        if (!progressData || progressData.length == 0){
            throw new NotFoundException('progress #${packId} not found !')
        }
        return progressData;
    }
    async getProgress(progressId: string) : Promise<progressInterface>{
        const existingProgress = await this.progressModel.findById(progressId).exec();
        if(!existingProgress){
            throw new NotFoundException('progress #${packId} not found !');

        }
        return existingProgress;
    }
    async deleteProgress(progressId : string) : Promise<progressInterface>{
        const deletedProgress = await this.progressModel.findByIdAndDelete(progressId);
        if (!deletedProgress){
            throw new NotFoundException('progress #${packId} not found !');
        }
        return deletedProgress;
       }
}