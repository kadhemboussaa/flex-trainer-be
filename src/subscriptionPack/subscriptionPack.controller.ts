import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { subscriptionPackService } from "./subscriptionPack.service";
import { createSubscriptionPackDto } from "src/dtos/create-subscriptionPack.dto";
import { updateSubscriptionPackDto } from "src/dtos/update-SubscriptionPack.dto";
import { Roles } from "src/decorator/role.decorator";
import { role } from "src/enum/role.enum";
import { AuthUserRoleGuard } from "src/guards/auth-user.guard";

@Controller('subscriptionPack')
export class subscriptionPackController{
    constructor (private readonly SubscriptionPackService : subscriptionPackService){}

    @Post()
    @UseGuards(AuthUserRoleGuard('*'))
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
    @UseGuards(AuthUserRoleGuard('*'))
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
    @UseGuards(AuthUserRoleGuard('*'))
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
    @UseGuards(AuthUserRoleGuard('*'))
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
    @UseGuards(AuthUserRoleGuard('*'))
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

    @Post(':subPackId/subscribe/:userId')
    async subscribe(
      @Param('subPackId') subPackId: string,
      @Param('userId') userId: string,
      @Res() response,
    ) {
      try {
        await this.SubscriptionPackService.subscribe(userId, subPackId);
        return response.status(HttpStatus.OK).json({
          message: 'User subscribed to the course successfully',
        });
      } catch (err) {
        if (err instanceof NotFoundException) {
          return response.status(HttpStatus.NOT_FOUND).json({
            message: err.message,
          });
        }
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'An error occurred while subscribing the user to the course',
          error: err.message,
        });
      }
    }
  

}