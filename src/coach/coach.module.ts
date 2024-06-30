import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { coachController } from './coach.controller';
import { coachService } from './coach.service';
import { CoachSchema } from 'src/schema/coach.schema';
import { UserModule } from 'src/user/user.module';
import { coachClientSchema } from 'src/schema/coachClient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'coach', schema: CoachSchema }]),
    MongooseModule.forFeature([
      { name: 'coachClientSchema', schema: coachClientSchema },
    ]),
    forwardRef(() => UserModule),
  ],
  controllers: [coachController],
  providers: [coachService],
  exports: [coachService],
})
export class coachModule {}
