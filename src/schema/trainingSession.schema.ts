import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class trainigSession {
    @Prop()
    trainingSessionTitle : string;
    @Prop()
    description : string;    
}
export const trainigSessionSchema = SchemaFactory.createForClass(trainigSession);
