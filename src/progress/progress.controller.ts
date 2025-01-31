import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { progressService } from "./progress.service";
import { createProgressDto } from "src/dtos/create-progress.dto";
import { updateProgressDto } from "src/dtos/update-progress.dto";
import { Roles } from "src/decorator/role.decorator";
import { role } from "src/enum/role.enum";
import { AuthUserRoleGuard } from "src/guards/auth-user.guard";

@Controller('progress')
export class progressController{
    constructor (private readonly ProgressService : progressService){}

    @Post()
    @UseGuards(AuthUserRoleGuard('*'))
    @Roles(role.COACH)
    async createProgress (
        @Res() response,
        @Body() CreateProgressDto : createProgressDto,
    ) {
        try {
            const newProgress = await this.ProgressService.createProgress(CreateProgressDto);
            return response.status(HttpStatus.CREATED).json({
                message : 'progress created successfully',
                newProgress
            });
        }catch (err){
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode : 400,
                message : 'Error : progress not created',
                error : 'BAD REQUEST'
            });
        }
    }

    @Put('/:id')
    @UseGuards(AuthUserRoleGuard('*'))
    @Roles(role.COACH)
    async updateProgress(@Res() response, @Param('id') progressId : string, @Body() UpdateProgressDto : updateProgressDto){
        try{
            const existingProgress = await this.ProgressService.updateProgress(
                progressId,
                UpdateProgressDto
            );
            return response.status(HttpStatus.OK).json({
                message : 'gym updated successfully',
                existingProgress
            });
        } catch (err){
            return response.status(err.status).json(err.response);
        }
    }

    @Get()
    @UseGuards(AuthUserRoleGuard('*'))
    @Roles(role.COACH,role.CLIENT)
    async getAllProgress(@Res() response){
        try{
            const progressData = await this.ProgressService.getAllProgress();
            return response.status(HttpStatus.OK).json({
                message : 'All progress data found successfully',
                progressData
            });
        } catch (err){
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    @UseGuards(AuthUserRoleGuard('*'))
    @Roles(role.COACH)
    async getProgress(@Res() response, @Param('id') progressId : string){
        try{
            const existingProgress = await this.ProgressService.getProgress(progressId);
            return response.status(HttpStatus.OK).json({
                message : 'progress found successfully',
                existingProgress
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    @Delete('/:id')
    @UseGuards(AuthUserRoleGuard('*'))
    @Roles(role.COACH, role.CLIENT)
    async deleteProgress(@Res() response, @Param('id') progressId : string) {
        try {
            const deleteProgress = await this.ProgressService.deleteProgress(progressId);
            return response.status(HttpStatus.OK).json({
                message : 'progress deleted successfully',
                deleteProgress
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }


}