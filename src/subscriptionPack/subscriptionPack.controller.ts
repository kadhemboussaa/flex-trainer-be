import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { subscriptionPackService } from "./subscriptionPack.service";
import { createSubscriptionPackDto } from "src/dtos/create-subscriptionPack.dto";
import { updateSubscriptionPackDto } from "src/dtos/update-SubscriptionPack.dto";
import { Roles } from "src/decorator/role.decorator";
import { role } from "src/enum/role.enum";

@Controller('subscriptionPack')
export class subscriptionPackController{
    constructor (private readonly SubscriptionPackService : subscriptionPackService){}

    @Post()
    @Roles(role.MANAGER)
    async createSubscriptionPack (@Res() response, @Body() CreateSubscriptionPackDto : createSubscriptionPackDto){
        try {
            const newPack = await this.SubscriptionPackService.createSubscriptionPack(CreateSubscriptionPackDto);
            return response.status(HttpStatus.CREATED).json({
                message : 'pack created successfully',
                newPack
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
    @Roles(role.MANAGER)
    async updateSubscriptionPack(@Res() response, @Param('id') packId : string, @Body() UpdateSubscriptionPackDto : updateSubscriptionPackDto){
        try{
            const existingPack = await this.SubscriptionPackService.updateSubscriptionPack(
                packId,
                UpdateSubscriptionPackDto
            );
            return response.status(HttpStatus.OK).json({
                message : 'pack updated successfully',
                existingPack
            });
        } catch (err){
            return response.status(err.status).json(err.response);
        }
    }

    @Get()
    @Roles(role.CLIENT)
    async getAllSubscriptionPack(@Res() response){
        try{
            const packData = await this.SubscriptionPackService.getAllSubscriptionPack();
            return response.status(HttpStatus.OK).json({
                message : 'All article data found successfully',
                packData
            });
        } catch (err){
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    @Roles(role.MANAGER)
    async getSubscriptionPack(@Res() response, @Param('id') packId : string){
        try{
            const existingPack = await this.SubscriptionPackService.getSubscriptionPack(packId);
            return response.status(HttpStatus.OK).json({
                message : 'pack found successfully',
                existingPack
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    @Delete('/:id')
    @Roles(role.MANAGER)
    async deleteSubscriptionPack(@Res() response, @Param('id') packId : string) {
        try {
            const deletePack = await this.SubscriptionPackService.deleteSubscriptionPack(packId);
            return response.status(HttpStatus.OK).json({
                message : 'Pack deleted successfully',
                deletePack
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }


}