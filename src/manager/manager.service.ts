import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { role } from "src/enum/role.enum";
import { userDocument } from "src/schema/user.schema";
import { UserService } from "src/user/user.service";
import { BaseUserDto } from 'src/dtos/create-base-user.dto'
import { UpdateUSerDto } from "src/dtos/updateUser.dto";

@Injectable()
export class managerService {
    constructor(@InjectModel('manager') private readonly userModel: Model<userDocument>,
    private readonly userService : UserService){}

    
    async createManager(baseUserDto : BaseUserDto) : Promise<userDocument>{
        const newManager =  this.userService.createOne({...baseUserDto, role: role.MANAGER});
    return newManager;
    }
    async findByEmail (email : string) : Promise < userDocument | any>{
        const manager = this.userService.findByEmail(email)
        return manager;
    }
    async getManagerById(managerId : string) : Promise <userDocument | any>{
        const manager = this.userService.getUserById(managerId)
        return manager;
    }
    async getAllManager() : Promise <userDocument | any>{
        const managerDetails = this.userService.getAllUser()
        return managerDetails
    }
    async updateManager(managerId : string, updateUserDto : UpdateUSerDto ) : Promise <userDocument|any>{
        const existingManager = this.userService.updateUser(managerId,updateUserDto)
        return existingManager
    }
    async deleteManager(managerId : string) : Promise <userDocument | any>{
        const existingManager = this.userService.deleteUser(managerId)
        return existingManager;
    }
    
}