import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { user } from './user.schema';
import { Document } from 'mongoose';

export type managerDocument = manager & Document

@Schema()
export class manager extends user{}

export const ManagerSchema = SchemaFactory.createForClass(manager);
