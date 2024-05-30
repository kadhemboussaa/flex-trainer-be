import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { role } from 'src/enum/role.enum';
import { Document } from 'mongoose';

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
}
export const UserSchema = SchemaFactory.createForClass(user);
