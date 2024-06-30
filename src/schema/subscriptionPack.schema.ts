import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { user } from './user.schema';

export type SubscriptionPackDocument = SubscriptionPack & Document;

@Schema()
export class SubscriptionPack {
  @Prop()
  packName: string;
  @Prop()
  description: string;
  @Prop()
  price: number;
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  })
  userSub?: user[];
}
export const SubscriptionPackSchema =
  SchemaFactory.createForClass(SubscriptionPack);
