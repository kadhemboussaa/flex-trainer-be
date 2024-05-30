import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { user } from './user.schema';
import { role } from '../enum/role.enum';
import { Document } from 'mongoose';

export type coachDocument = coach & Document

@Schema()
export class coach extends user{

}
export const CoachSchema = SchemaFactory.createForClass(coach);
