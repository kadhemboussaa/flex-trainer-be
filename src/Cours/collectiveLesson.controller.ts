import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { collectiveLessonService } from './collectiveLesson.service';
import { createCollectiveLessonDto } from 'src/dtos/create-collectiveLesson.dto';
import { updateCollectiveLessonDto } from 'src/dtos/update-collectiveLesson.dto';
import { Roles } from 'src/decorator/role.decorator';
import { role } from 'src/enum/role.enum';
import { AuthUserRoleGuard } from 'src/guards/auth-user.guard';

@Controller('collectiveLesson')
export class collectiveLessonController {
  constructor(
    private readonly CollectiveLessonService: collectiveLessonService,
  ) {}

  @Post()
  @UseGuards(AuthUserRoleGuard('*'))
  @Roles(role.MANAGER)
  async createCollectiveLesson(
    @Res() response,
    @Body() CreateCollectiveLessonDto: createCollectiveLessonDto,
  ) {
    try {
      const newLesson =
        await this.CollectiveLessonService.createCollectiveLesson(
          CreateCollectiveLessonDto,
        );
      return response.status(HttpStatus.CREATED).json({
        message: 'lesson created successfully',
        newLesson,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error : pack not created',
        error: 'BAD REQUEST',
      });
    }
  }

  @Put('/:id')
  @Roles(role.MANAGER)
  async updateCollectiveLesson(
    @Res() response,
    @Param('id') lessonId: string,
    @Body() UpdateCollectiveLessonDto: updateCollectiveLessonDto,
  ) {
    try {
      const existingLesson =
        await this.CollectiveLessonService.updateCollectiveLesson(
          lessonId,
          UpdateCollectiveLessonDto,
        );
      return response.status(HttpStatus.OK).json({
        message: 'lesson updated successfully',
        existingLesson,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  @UseGuards(AuthUserRoleGuard('*'))
  @Roles(role.COACH, role.CLIENT)
  async getAllCollectiveLesson(@Res() response) {
    try {
      const lessonData =
        await this.CollectiveLessonService.getAllCollectiveLesson();
      return response.status(HttpStatus.OK).json({
        message: 'All session data found successfully',
        lessonData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  @UseGuards(AuthUserRoleGuard('*'))
  @Roles(role.MANAGER)
  async getCollectiveLesson(@Res() response, @Param('id') lessonId: string) {
    try {
      const existingLesson =
        await this.CollectiveLessonService.getCollectiveLesson(lessonId);
      return response.status(HttpStatus.OK).json({
        message: 'session found successfully',
        existingLesson,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  @UseGuards(AuthUserRoleGuard('*'))
  @Roles(role.MANAGER)
  async deleteCollectiveLesson(@Res() response, @Param('id') lessonId: string) {
    try {
      const deleteLesson =
        await this.CollectiveLessonService.deleteCollectiveLesson(lessonId);
      return response.status(HttpStatus.OK).json({
        message: 'session deleted successfully',
        deleteLesson,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Post(':courseId/subscribe/:userId')
  async subscribe(
    @Param('courseId') courseId: string,
    @Param('userId') userId: string,
    @Res() response,
  ) {
    try {
      await this.CollectiveLessonService.subscribe(userId, courseId);
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

  @Post(':courseId/like/:userId')
  async like(
    @Param('courseId') courseId: string,
    @Param('userId') userId: string,
    @Res() response,
  ) {
    try {
      await this.CollectiveLessonService.like(userId, courseId);
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

  @Get(':id/subscribers')
  async getSubscribersByLessonId(
    @Param('id') lessonId: string,
    @Res() response,
  ) {
    try {
      const subscribers =
        await this.CollectiveLessonService.getSubscribersByLessonId(lessonId);
      console.log(subscribers);

      return response.status(HttpStatus.OK).json({
        message: `Subscribers for lesson #${lessonId} found successfully`,
        leason: subscribers,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
