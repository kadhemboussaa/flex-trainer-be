import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { createCollectiveLessonDto } from "src/dtos/create-collectiveLesson.dto";
import { updateCollectiveLessonDto } from "src/dtos/update-collectiveLesson.dto";
import { collectiveLessonInterface } from "src/interface/collectiveLesson.interface";

@Injectable()
export class collectiveLessonService {
    constructor(@InjectModel('collectiveLesson') private collectiveLessonModel: Model<collectiveLessonInterface>){}
    
    async createCollectiveLesson(CreateCollectiveLessonDto : createCollectiveLessonDto) : Promise<collectiveLessonInterface>{
        const newLesson = await new this.collectiveLessonModel(CreateCollectiveLessonDto);
    return newLesson.save();
    }
    async updateCollectiveLesson(
        lessonId  : string,
        UpdateCollectiveLessonDto : updateCollectiveLessonDto,
    ) : Promise <collectiveLessonInterface>{
        const existingLesson = await this.collectiveLessonModel.findByIdAndUpdate(
            lessonId,
            UpdateCollectiveLessonDto ,
            {new: true},
        );
        if(!existingLesson){
            throw new NotFoundException('session #${packId} not found !');

        }
        return existingLesson;
    }
    async getAllCollectiveLesson():Promise<collectiveLessonInterface[]>{
        const lessonData = await this.collectiveLessonModel.find();
        if (!lessonData || lessonData.length == 0){
            throw new NotFoundException('session #${packId} not found !')
        }
        return lessonData;
    }
    async getCollectiveLesson(lessonId: string) : Promise<collectiveLessonInterface>{
        const existingLesson = await this.collectiveLessonModel.findById(lessonId).exec();
        if(!existingLesson){
            throw new NotFoundException('session #${packId} not found !');

        }
        return existingLesson;
    }
    async deleteCollectiveLesson(lessonId : string) : Promise<collectiveLessonInterface>{
        const deletedLesson = await this.collectiveLessonModel.findByIdAndDelete(lessonId);
        if (!deletedLesson){
            throw new NotFoundException('session #${packId} not found !');
        }
        return deletedLesson;
       }
}