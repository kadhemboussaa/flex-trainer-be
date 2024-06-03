import { Body, Controller, Delete, Get, HttpStatus, Param, Put, Res, UseGuards } from "@nestjs/common";
import { coachService } from "./coach.service";
import { UpdateUSerDto } from "src/dtos/updateUser.dto";
import { userDocument } from "src/schema/user.schema";
import {  AuthUserRoleGuard } from "src/guards/auth-user.guard";
import { role } from "src/enum/role.enum";
import { Roles } from "src/decorator/role.decorator";

@Controller('coach')
export class coachController{
    constructor (private CoachService : coachService){}
    @Put('/:id')
    @UseGuards(AuthUserRoleGuard('*'))
    @Roles(role.COACH)
    async updateCoach(@Res() response, @Param('id') coachId : string, @Body() UpdateUSerDto : UpdateUSerDto){
        try {
            const existingCoach = await this.CoachService.updateCoach(
                coachId,
                UpdateUSerDto
            );
            return response.status(HttpStatus.OK).json({
                message : 'caoch has been successfully updated',
                existingCoach
            });
        } catch (err){
            return response.status(err.status).json(err.response);
        }
    }
    @Get()
    @UseGuards(AuthUserRoleGuard('*'))
    @Roles(role.MANAGER)
    async getAllCoach(@Res() response): Promise<userDocument>{
        try{
            const coachData = await this.CoachService.getAllCoach();
            return response.status(HttpStatus.OK).json({
                message : 'All coach data found successfully',
                coachData
            });
        } catch (err){
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    @UseGuards(AuthUserRoleGuard('*'))
    @Roles(role.MANAGER)
    async getCoachById( @Param('id') coachId : string) : Promise<userDocument | any>{
        return this.CoachService.getCoachById(coachId);
    }
    @Delete('/:id')
    @UseGuards(AuthUserRoleGuard('*'))
    @Roles(role.MANAGER)
    async deleteCoach(@Res() response, @Param('id') coachId : string) {
        try {
            const deleteCoach = await this.CoachService.deleteCoach(coachId);
            return response.status(HttpStatus.OK).json({
                message : 'coach deleted successfully',
                deleteCoach
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

}