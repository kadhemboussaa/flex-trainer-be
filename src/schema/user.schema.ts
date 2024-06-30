import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { role } from 'src/enum/role.enum';
import mongoose, { Document } from 'mongoose';
import { collectiveLesson } from './collectiveLesson.schema';
import { event } from './event.schema';
import { SubscriptionPack } from './subscriptionPack.schema';

export type userDocument = user & Document;

@Schema()
export class user {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: String, enum: role, required: true })
  role: role;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'collectiveLesson' }],
  })
  subscriptions?: collectiveLesson[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'event' }],
  })
  eventSubscriptions?: event[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'event' }],
  })
  likes?: event[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionPack' }],
  })
  subpack?: SubscriptionPack[];
}
export const UserSchema = SchemaFactory.createForClass(user);
