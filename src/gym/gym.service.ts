import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { createGymDto } from "src/dtos/create-gym.dto";
import { updateGymDto } from "src/dtos/update-gym.dto";
import { gymInterface } from "src/interface/gym.interface";

@Injectable()
export class gymService {
    constructor(@InjectModel('gym') private gymModel: Model<gymInterface>){}
    
    async createGym(CreateGymDto : createGymDto) : Promise<gymInterface>{
        const newGym = await new this.gymModel(CreateGymDto);
    return newGym.save();
    }
    async updateGym(
        gymId  : string,
        UpdateGymDto : updateGymDto,
    ) : Promise <gymInterface>{
        const existingGym = await this.gymModel.findByIdAndUpdate(
            gymId,
            UpdateGymDto ,
            {new: true},
        );
        if(!existingGym){
            throw new NotFoundException('gym #${packId} not found !');

        }
        return existingGym;
    }
    async getAllGym(): Promise<{ gyms: gymInterface[], count: number }> {
        const gyms = await this.gymModel.find().exec();
        const count = await this.gymModel.countDocuments().exec();
        if (!gyms || gyms.length === 0) {
            throw new NotFoundException('No gyms found!');
        }
        return { gyms, count };
    }
    async getGym(gymId: string) : Promise<gymInterface>{
        const existingGym = await this.gymModel.findById(gymId).exec();
        if(!existingGym){
            throw new NotFoundException('gym #${packId} not found !');

        }
        return existingGym;
    }
    async deleteGym(gymId : string) : Promise<gymInterface>{
        const deletedGym = await this.gymModel.findByIdAndDelete(gymId);
        if (!deletedGym){
            throw new NotFoundException('gym #${packId} not found !');
        }
        return deletedGym;
       }
}