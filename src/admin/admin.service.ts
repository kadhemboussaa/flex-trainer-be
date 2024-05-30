import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { role } from "src/enum/role.enum";
import { UserService } from "src/user/user.service";
import { BaseUserDto } from 'src/dtos/create-base-user.dto'
import { UpdateUSerDto } from "src/dtos/updateUser.dto";
import { userDocument } from "src/schema/user.schema";

@Injectable()
export class adminService {
    constructor(@InjectModel('admin') private readonly userModel: Model<userDocument>,
    private readonly userService : UserService){}

    
    async createAdmin(baseUserDto : BaseUserDto) : Promise<userDocument>{
        const newAdmin =  this.userService.createOne({...baseUserDto, role: role.ADMIN});
    return newAdmin;
    }
    async findByEmail (email : string) : Promise < userDocument | any>{
        const admin = this.userService.findByEmail(email)
        return admin;
    }
    async getAdminById(adminId : string) : Promise <userDocument | any>{
        const admin = this.userService.getUserById(adminId)
        return admin;
    }
    async getAllAdmin() : Promise <userDocument | any>{
        const adminDetails = this.userService.getAllUser()
        return adminDetails
    }
    async updateAdmin(adminId : string, updateUserDto : UpdateUSerDto ) : Promise <userDocument|any>{
        const existingAdmin = this.userService.updateUser(adminId,updateUserDto)
        return existingAdmin
    }
    async deleteAdmin(adminId : string) : Promise <userDocument | any>{
        const existingAdmin = this.userService.deleteUser(adminId)
        return existingAdmin;
    }
    
}