import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { user } from './user.schema';

export type coachClientDocument = coachClient & Document;

@Schema()
export class coachClient {
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
}

export const coachClientSchema = SchemaFactory.createForClass(coachClient);
