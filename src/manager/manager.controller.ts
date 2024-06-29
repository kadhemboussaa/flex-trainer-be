import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { managerService } from './manager.service';
import { UpdateUSerDto } from 'src/dtos/updateUser.dto';
import { userDocument } from 'src/schema/user.schema';
import { AuthUserRoleGuard } from 'src/guards/auth-user.guard';
import { role } from 'src/enum/role.enum';
import { Roles } from 'src/decorator/role.decorator';
import { Response } from 'express';

@Controller('manager')
export class managerController {
  constructor(private ManagerService: managerService) {}
  @Put('/:id')
  @UseGuards(AuthUserRoleGuard('*'))
  @Roles(role.MANAGER)
  async updateManager(
    @Res() response,
    @Param('id') managerId: string,
    @Body() UpdateUSerDto: UpdateUSerDto,
  ) {
    try {
      const existingManager = await this.ManagerService.updateManager(
        managerId,
        UpdateUSerDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'manager has been successfully updated',
        existingManager,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get()
  @UseGuards(AuthUserRoleGuard('*'))
  @Roles(role.ADMIN)
  async getAllManager(@Res() response: Response): Promise<Response> {
    try {
      const managerData = await this.ManagerService.getAllManagers();
      return response.status(HttpStatus.OK).json({
        message: 'All managers data found successfully',
        managerData,
      });
    } catch (err) {
      return response
        .status(err.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
          message: 'An error occurred while fetching managers data',
          error: err.message,
        });
    }
  }

  @Get('/:id')
  @UseGuards(AuthUserRoleGuard('*'))
  @Roles(role.ADMIN)
  async getManagerById(
    @Param('id') managerId: string,
  ): Promise<userDocument | any> {
    return this.ManagerService.deleteManager(managerId);
  }
  @Delete('/:id')
  @UseGuards(AuthUserRoleGuard('*'))
  @Roles(role.ADMIN)
  async deleteManager(@Res() response, @Param('id') managerId: string) {
    try {
      const deleteManager = await this.ManagerService.deleteManager(managerId);
      return response.status(HttpStatus.OK).json({
        message: 'manager deleted successfully',
        deleteManager,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
