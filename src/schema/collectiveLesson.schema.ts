import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { user } from './user.schema';
@Schema()
export class collectiveLesson {
  @Prop()
  lessonTitle: string;
  @Prop()
  description: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }] })
  subscribers: user[];
}
export const CollectivelessonSchema =
  SchemaFactory.createForClass(collectiveLesson);
