import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { eventService } from "./event.service";
import { createEventDto } from "src/dtos/create-event.dto";
import { Roles } from "src/decorator/role.decorator";
import { role } from "src/enum/role.enum";
import { AuthUserRoleGuard } from "src/guards/auth-user.guard";

@Controller('gym')
export class eventController{
    constructor (private readonly EventService : eventService){}

    @Post()
    @UseGuards(AuthUserRoleGuard('*'))
    @Roles(role.MANAGER)
    async createEvent (@Res() response, @Body() CreateEventDto : createEventDto){
        try {
            const newEvent = await this.EventService.createEvent(CreateEventDto);
            return response.status(HttpStatus.CREATED).json({
                message : 'event created successfully',
                newEvent
            });
        }catch (err){
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode : 400,
                message : 'Error : gym not created',
                error : 'BAD REQUEST'
            });
        }
    }

    @Get()
    @UseGuards(AuthUserRoleGuard('*'))
    @Roles(role.COACH,role.CLIENT)
    async getAllEvent(@Res() response){
        try{
            const eventData = await this.EventService.getAllEvent();
            return response.status(HttpStatus.OK).json({
                message : 'All gym data found successfully',
                eventData
            });
        } catch (err){
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    @UseGuards(AuthUserRoleGuard('*'))
    @Roles(role.MANAGER)
    async getEvent(@Res() response, @Param('id') eventId : string){
        try{
            const existingEvent = await this.EventService.getEvent(eventId);
            return response.status(HttpStatus.OK).json({
                message : 'event found successfully',
                existingEvent
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    @Delete('/:id')
    @UseGuards(AuthUserRoleGuard('*'))
    @Roles(role.MANAGER)
    async deleteEvent(@Res() response, @Param('id') eventId : string) {
        try {
            const deleteEvent = await this.EventService.deleteEvent(eventId);
            return response.status(HttpStatus.OK).json({
                message : 'event deleted successfully',
                deleteEvent
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }


}