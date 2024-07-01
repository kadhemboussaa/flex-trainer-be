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
import { eventService } from './event.service';
import { createEventDto } from 'src/dtos/create-event.dto';
import { Roles } from 'src/decorator/role.decorator';
import { role } from 'src/enum/role.enum';
import { AuthUserRoleGuard } from 'src/guards/auth-user.guard';
import { updateEventDto } from 'src/dtos/update-event.dto';

@Controller('event')
export class eventController {
  constructor(private readonly EventService: eventService) {}

  @Post()
  @UseGuards(AuthUserRoleGuard('*'))
  @Roles(role.MANAGER)
  async createEvent(@Res() response, @Body() CreateEventDto: createEventDto) {
    try {
      const newEvent = await this.EventService.createEvent(CreateEventDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'event created successfully',
        newEvent,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error : gym not created',
        error: 'BAD REQUEST',
      });
    }
  }

  @Get()
  @UseGuards(AuthUserRoleGuard('*'))
  @Roles(role.COACH, role.CLIENT)
  async getAllEvent(@Res() response) {
    try {
      const eventData = await this.EventService.getAllEvent();
      return response.status(HttpStatus.OK).json({
        message: 'All gym data found successfully',
        eventData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  @UseGuards(AuthUserRoleGuard('*'))
  @Roles(role.MANAGER)
  async getEvent(@Res() response, @Param('id') eventId: string) {
    try {
      const existingEvent = await this.EventService.getEvent(eventId);
      return response.status(HttpStatus.OK).json({
        message: 'event found successfully',
        existingEvent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  @UseGuards(AuthUserRoleGuard('*'))
  @Roles(role.MANAGER)
  async deleteEvent(@Res() response, @Param('id') eventId: string) {
    try {
      const deleteEvent = await this.EventService.deleteEvent(eventId);
      return response.status(HttpStatus.OK).json({
        message: 'event deleted successfully',
        deleteEvent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Put('/:id')
  @UseGuards(AuthUserRoleGuard('*'))
  @Roles(role.MANAGER)
  async updateGym(
    @Res() response,
    @Param('id') eventId: string,
    @Body() UpdateGymDto: updateEventDto,
  ) {
    try {
      const existingEvent = await this.EventService.updateEvent(
        eventId,
        UpdateGymDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'gym updated successfully',
        existingEvent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post(':eventId/subscribe/:userId')
  async subscribe(
    @Param('eventId') eventId: string,
    @Param('userId') userId: string,
    @Res() response,
  ) {
    try {
      await this.EventService.subscribe(userId, eventId);
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
      const liked = await this.EventService.like(userId, courseId);
      return response.status(HttpStatus.OK).json({
        message: 'User liked to the course successfully',
        liked,
      });
    } catch (err) {
      if (err instanceof NotFoundException) {
        return response.status(HttpStatus.NOT_FOUND).json({
          message: err.message,
        });
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred while liking the user to the event',
        error: err.message,
      });
    }
  }

  @Post(':courseId/dislike/:userId')
  async dislike(
    @Param('courseId') courseId: string,
    @Param('userId') userId: string,
    @Res() response,
  ) {
    try {
      const disliked = await this.EventService.dislike(userId, courseId);
      return response.status(HttpStatus.OK).json({
        message: 'User disliked to the course successfully',
        disliked,
      });
    } catch (err) {
      if (err instanceof NotFoundException) {
        return response.status(HttpStatus.NOT_FOUND).json({
          message: err.message,
        });
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred while disliking the user to the event',
        error: err.message,
      });
    }
  }

  @Get(':id/subscribers')
  async getSubscribersByEventId(@Param('id') eventId: string, @Res() response) {
    try {
      const subscribers = await this.EventService.getSubscribersByLEventId(
        eventId,
      );
      console.log(subscribers);

      return response.status(HttpStatus.OK).json({
        message: `Subscribers for lesson #${eventId} found successfully`,
        leason: subscribers,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
