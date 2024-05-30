import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { trainingSessionService } from "./trainingSession.service";
import { createTrainingSessionDto } from "src/dtos/create-trainingSession.dto";
import { updateTrainingSessionDto } from "src/dtos/update-trainingSession.dto";
import { Roles } from "src/decorator/role.decorator";
import { role } from "src/enum/role.enum";

@Controller('trainingSession')
export class trainingSessionController{
    constructor (private readonly TrainingSessionService : trainingSessionService){}

    @Post()
    @Roles(role.COACH)
    async createTrainingSession (@Res() response, @Body() CreateTrainingSessionDto : createTrainingSessionDto){
        try {
            const newSession = await this.TrainingSessionService.createTrainingSession(CreateTrainingSessionDto);
            return response.status(HttpStatus.CREATED).json({
                message : 'session created successfully',
                newSession
            });
        }catch (err){
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode : 400,
                message : 'Error : pack not created',
                error : 'BAD REQUEST'
            });
        }
    }

    @Put('/:id')
    @Roles(role.COACH)
    async updateTrainingSession(@Res() response, @Param('id') sessionId : string, @Body() UpdateTrainingSessionDto : updateTrainingSessionDto){
        try{
            const existingSession = await this.TrainingSessionService.updateTrainingSession(
                sessionId,
                UpdateTrainingSessionDto
            );
            return response.status(HttpStatus.OK).json({
                message : 'session updated successfully',
                existingSession
            });
        } catch (err){
            return response.status(err.status).json(err.response);
        }
    }

    @Get()
    @Roles(role.CLIENT, role.COACH)
    async getAllTrainingSession(@Res() response){
        try{
            const sessionData = await this.TrainingSessionService.getAllTrainingSession();
            return response.status(HttpStatus.OK).json({
                message : 'All session data found successfully',
                sessionData
            });
        } catch (err){
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    @Roles(role.COACH)
    async getTrainingSession(@Res() response, @Param('id') sessionId : string){
        try{
            const existingSession = await this.TrainingSessionService.getTrainingSession(sessionId);
            return response.status(HttpStatus.OK).json({
                message : 'session found successfully',
                existingSession
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    @Delete('/:id')
    @Roles(role.COACH)
    async deleteTrainingSession(@Res() response, @Param('id') sessionId : string) {
        try {
            const deleteSession = await this.TrainingSessionService.deleteTrainingSession(sessionId);
            return response.status(HttpStatus.OK).json({
                message : 'session deleted successfully',
                deleteSession
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}