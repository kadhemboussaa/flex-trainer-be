import { Body, Controller, Delete, Get, HttpStatus, Param, Put, Res } from "@nestjs/common";
import { clientService } from "./client.service";
import { UpdateUSerDto } from "src/dtos/updateUser.dto";
import { userDocument } from "src/schema/user.schema";

@Controller('client')
export class clientController{
    constructor (private ClientService : clientService){}
    @Put('/:id')
    async updateClient(@Res() response, @Param('id') clientId : string, @Body() UpdateUSerDto : UpdateUSerDto){
        try {
            const existingClient = await this.ClientService.updateClient(
                clientId,
                UpdateUSerDto
            );
            return response.status(HttpStatus.OK).json({
                message : 'client has been successfully updated',
                existingClient
            });
        } catch (err){
            return response.status(err.status).json(err.response);
        }
    }
    @Get()
    async getAllClient(@Res() response): Promise<userDocument>{
        try{
            const clientData = await this.ClientService.getAllClient();
            return response.status(HttpStatus.OK).json({
                message : 'All clients data found successfully',
                clientData
            });
        } catch (err){
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    async getClientById( @Param('id') clientId : string) : Promise<userDocument | any>{
        return this.ClientService.getClientById(clientId);
    }
    @Delete('/:id')
    async deleteClient(@Res() response, @Param('id') clientId : string) {
        try {
            const deleteAdmin = await this.ClientService.deleteClient(clientId);
            return response.status(HttpStatus.OK).json({
                message : 'admin deleted successfully',
                deleteAdmin
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

}