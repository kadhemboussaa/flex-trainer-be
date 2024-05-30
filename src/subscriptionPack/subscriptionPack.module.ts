import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { subscriptionPackController } from './subscriptionPack.controller';
import { subscriptionPackService } from './subscriptionPack.service';
import { SubscriptionPackSchema } from 'src/schema/subscriptionPack.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'SubscriptionPack', schema: SubscriptionPackSchema }])],
  controllers: [subscriptionPackController],
  providers: [subscriptionPackService],
  exports: [subscriptionPackService],
})
export class subscriptionPackModule {}
