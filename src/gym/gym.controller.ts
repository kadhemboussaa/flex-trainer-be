import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { gymService } from './gym.service';
import { createGymDto } from 'src/dtos/create-gym.dto';
import { updateGymDto } from 'src/dtos/update-gym.dto';
import { Roles } from 'src/decorator/role.decorator';
import { role } from 'src/enum/role.enum';
import { AuthUserRoleGuard } from 'src/guards/auth-user.guard';

@Controller('gym')
export class gymController {
  constructor(private readonly GymService: gymService) {}

  @Post()
  @UseGuards(AuthUserRoleGuard('*'))
  @Roles(role.ADMIN)
  async createGym(@Res() response, @Body() CreateGymDto: createGymDto) {
    try {
      const newGym = await this.GymService.createGym(CreateGymDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Gym created successfully',
        newGym,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error : gym not created',
        error: 'BAD REQUEST',
      });
    }
  }

  @Put('/:id')
  @UseGuards(AuthUserRoleGuard('*'))
  @Roles(role.ADMIN)
  async updateGym(
    @Res() response,
    @Param('id') gymId: string,
    @Body() UpdateGymDto: updateGymDto,
  ) {
    try {
      const existingGym = await this.GymService.updateGym(gymId, UpdateGymDto);
      return response.status(HttpStatus.OK).json({
        message: 'gym updated successfully',
        existingGym,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  @UseGuards(AuthUserRoleGuard('*'))
  @Roles(role.ADMIN)
  async getAllGym(@Res() response) {
    try {
      const gymData = await this.GymService.getAllGym();
      return response.status(HttpStatus.OK).json({
        message: 'All gym data found successfully',
        gymData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  @UseGuards(AuthUserRoleGuard('*'))
  @Roles(role.ADMIN)
  async getGym(@Res() response, @Param('id') gymId: string) {
    try {
      const existingGym = await this.GymService.getGym(gymId);
      return response.status(HttpStatus.OK).json({
        message: 'gym found successfully',
        existingGym,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  @UseGuards(AuthUserRoleGuard('*'))
  @Roles(role.ADMIN)
  async deleteGym(@Res() response, @Param('id') gymId: string) {
    try {
      const deleteGym = await this.GymService.deleteGym(gymId);
      return response.status(HttpStatus.OK).json({
        message: 'gym deleted successfully',
        deleteGym,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
