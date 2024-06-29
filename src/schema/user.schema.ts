import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { role } from 'src/enum/role.enum';
import mongoose, { Document } from 'mongoose';
import { collectiveLesson } from './collectiveLesson.schema';

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
}
export const UserSchema = SchemaFactory.createForClass(user);
