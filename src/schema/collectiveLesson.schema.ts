import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class collectiveLesson {
  @Prop()
  lessonTitle: string;
  @Prop()
  description: string;
}
export const CollectivelessonSchema = SchemaFactory.createForClass(collectiveLesson);
