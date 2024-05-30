import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { coachController } from './coach.controller';
import { coachService } from './coach.service';
import { CoachSchema } from 'src/schema/coach.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'coach', schema: CoachSchema }]),
  UserModule],
  controllers: [coachController],
  providers: [coachService],
  exports: [coachService],
})
export class coachModule {}
