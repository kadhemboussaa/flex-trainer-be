import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { user } from './user.schema';
export type eventDocument = event & Document;
@Schema()
export class event {
  @Prop()
  eventTitle: string;
  @Prop()
  description: string;
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  })
  subscriptions?: user[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  })
  likes?: user[];
}

export const EventSchema = SchemaFactory.createForClass(event);
