import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { user, userDocument } from './user.schema';
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
  likes?: userDocument[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  })
  dislikes?: userDocument[];
  likesCount?: number;
  dislikesCount?: number;
}
interface eventInterface extends Document {
  description: string[];
  eventTitle: string[];
  subscriptions: user[];
  likes: userDocument[];
  dislikes: userDocument[];
  likesCount?: number;
  dislikesCount?: number;
}
export const EventSchema = SchemaFactory.createForClass(event);
