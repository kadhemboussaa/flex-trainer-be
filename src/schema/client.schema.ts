import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { user } from './user.schema';
import { Document } from 'mongoose';

export type clientDocument = client & Document;

@Schema()
export class client extends user {}
export const ClientSchema = SchemaFactory.createForClass(client);
