import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { user } from './user.schema';

export type collectiveLessonDocument = collectiveLesson & Document;

@Schema()
export class collectiveLesson {
  @Prop()
  lessonTitle: string;
  @Prop()
  description: string;

  @Prop({ 
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }] 
  })
  subscribers?: user[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  })
  likes?: user[];
}
export const CollectivelessonSchema =
  SchemaFactory.createForClass(collectiveLesson);
