import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { user } from './user.schema';
import { Document } from 'mongoose';
import { role } from 'src/enum/role.enum';

export type adminDocument = user & Document

@Schema()
export class admin extends user{
 role : role
}
export  const AdminSchema = SchemaFactory.createForClass(admin);