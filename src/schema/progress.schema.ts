import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { user } from './user.schema';

export type progressDocument = progress & Document;

@Schema()
export class progress {
  @Prop({
    type: Types.ObjectId,
    ref: 'user',
  })
  coach: user;

  @Prop({
    type: Types.ObjectId,
    ref: 'user',
  })
  client: user;
  @Prop()
  startDate: Date;
  @Prop()
  endDate: Date;
  @Prop()
  status: string;
  @Prop()
  description: string;
}
export const ProgressSchema = SchemaFactory.createForClass(progress);
