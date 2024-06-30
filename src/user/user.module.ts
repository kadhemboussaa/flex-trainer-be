import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { coachClientSchema } from 'src/schema/coachClient.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: 'coachClient', schema: coachClientSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  providers: [UserService],
  exports: [UserService, MongooseModule],
})
export class UserModule {}
