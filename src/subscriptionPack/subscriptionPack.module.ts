import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { subscriptionPackController } from './subscriptionPack.controller';
import { subscriptionPackService } from './subscriptionPack.service';
import { SubscriptionPackSchema } from 'src/schema/subscriptionPack.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'SubscriptionPack', schema: SubscriptionPackSchema }]),
  UserModule],
  controllers: [subscriptionPackController],
  providers: [subscriptionPackService],
  exports: [subscriptionPackService],
})
export class subscriptionPackModule {}
