import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { clientService } from "./client.service";
import { UpdateUSerDto } from "src/dtos/updateUser.dto";
import { userDocument } from "src/schema/user.schema";
import { MailService } from "./mail.service";
import { coachService } from "src/coach/coach.service";

@Controller('client')
export class clientController{
    constructor (private ClientService : clientService,
        private mailService: MailService,
        private coachService : coachService
    ){}
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

    @Post('/select-coach/:clientId/:coachId')
    async selectCoach(@Res() response, @Param('clientId') clientId: string, @Param('coachId') coachId: string) {
        try {
            const client = await this.ClientService.getClientById(clientId);
            const coach = await this.coachService.getCoachById(coachId);
            const subject = 'A Client choose you';
            const message = `Hello ${coach.firstName},
                                The client ${client.firstName} chooses u to train him`

            await this.mailService.sendMail(coach.email,subject,message);

            return response.status(HttpStatus.OK).json({
                message: 'Coach selected successfully and email sent to coach',
                client,
                coach
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}