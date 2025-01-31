import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { adminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { clientModule } from './client/client.module';
import { coachModule } from './coach/coach.module';
import { collectiveLessonController } from './Cours/collectiveLesson.controller';
import { collectiveLessonService } from './Cours/collectiveLesson.service';
import { eventController } from './event/event.controller';
import { eventService } from './event/event.service';
import { JwtStrategy } from './guards/jwt.strategy';
import { gymController } from './gym/gym.controller';
import { gymService } from './gym/gym.service';
import { progressController } from './progress/progress.controller';
import { progressService } from './progress/progress.service';
import { CollectivelessonSchema } from './schema/collectiveLesson.schema';
import { EventSchema } from './schema/event.schema';
import { GymSchema } from './schema/gym.schema';
import { ProgressSchema } from './schema/progress.schema';
import { trainigSessionSchema } from './schema/trainingSession.schema';
import { UserSchema } from './schema/user.schema';
import { subscriptionPackModule } from './subscriptionPack/subscriptionPack.module';
import { trainingSessionController } from './trainingSession/trainingSession.controller';
import { trainingSessionService } from './trainingSession/trainingSession.service';
import { UserModule } from './user/user.module';
import { ManagerModule } from './manager/manager.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/flexTrainerDb'),
    MongooseModule.forFeature([
      { name: 'collectiveLesson', schema: CollectivelessonSchema },
      { name: 'event', schema: EventSchema },
      { name: 'gym', schema: GymSchema },
      { name: 'progress', schema: ProgressSchema },
      { name: 'trainingSession', schema: trainigSessionSchema },
      { name: 'user', schema: UserSchema },
    ]),
    subscriptionPackModule,
    forwardRef(() => adminModule),
    clientModule,
    coachModule,
    forwardRef(() => AuthModule),
    forwardRef(() => ManagerModule),
    forwardRef(() => UserModule),
  ],
  controllers: [
    AppController,
    gymController,
    progressController,
    eventController,
    trainingSessionController,
    collectiveLessonController,
  ],
  providers: [
    AppService,
    gymService,
    progressService,
    trainingSessionService,
    eventService,
    collectiveLessonService,
    JwtStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleGuard,
    // },
  ],
})
export class AppModule {}
