import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { role } from "src/enum/role.enum";
import { userDocument } from "src/schema/user.schema";
import { UserService } from "src/user/user.service";
import { BaseUserDto } from 'src/dtos/create-base-user.dto'
import { UpdateUSerDto } from "src/dtos/updateUser.dto";

@Injectable()
export class coachService {
    constructor(@InjectModel('coach') private readonly userModel: Model<userDocument>,
    private readonly userService : UserService){}

    
    async createCoach(baseUserDto : BaseUserDto) : Promise<userDocument>{
        const newCoach =  this.userService.createOne({...baseUserDto, role: role.COACH});
    return newCoach;
    }
    async findByEmail (email : string) : Promise < userDocument | any>{
        const coach = this.userService.findByEmail(email)
        return coach;
    }
    async getCoachById(coachId : string) : Promise <userDocument | any>{
        const coach = this.userService.getUserById(coachId)
        return coach;
    }
    async getAllCoach() : Promise <userDocument | any>{
        const coachDetails = this.userService.getAllUser()
        return coachDetails
    }
    async updateCoach(coachId : string, updateUserDto : UpdateUSerDto ) : Promise <userDocument|any>{
        const existingCoach = this.userService.updateUser(coachId,updateUserDto)
        return existingCoach
    }
    async deleteCoach(coachId : string) : Promise <userDocument | any>{
        const existingCoach = this.userService.deleteUser(coachId)
        return existingCoach;
    }
    
}