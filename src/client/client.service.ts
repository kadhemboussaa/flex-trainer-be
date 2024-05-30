import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { role } from "src/enum/role.enum";
import { userDocument } from "src/schema/user.schema";
import { UserService } from "src/user/user.service";
import { BaseUserDto } from 'src/dtos/create-base-user.dto'
import { UpdateUSerDto } from "src/dtos/updateUser.dto";

@Injectable()
export class clientService {
    constructor(@InjectModel('client') private readonly userModel: Model<userDocument>,
    private readonly userService : UserService){}

    
    async createClient(baseUserDto : BaseUserDto) : Promise<userDocument>{
        const newClient =  this.userService.createOne({...baseUserDto, role: role.CLIENT});
    return newClient;
    }
    async findByEmail (email : string) : Promise < userDocument | any>{
        const client = this.userService.findByEmail(email)
        return client;
    }
    async getClientById(clientId : string) : Promise <userDocument | any>{
        const client = this.userService.getUserById(clientId)
        return client;
    }
    async getAllClient() : Promise <userDocument | any>{
        const clientDetails = this.userService.getAllUser()
        return clientDetails
    }
    async updateClient(clientId : string, updateUserDto : UpdateUSerDto ) : Promise <userDocument|any>{
        const existingClient = this.userService.updateUser(clientId,updateUserDto)
        return existingClient
    }
    async deleteClient(clientId : string) : Promise <userDocument | any>{
        const existingClient = this.userService.deleteUser(clientId)
        return existingClient;
    }
    
}