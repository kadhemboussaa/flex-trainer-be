import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class progress {
    @Prop()
    startDate : Date;
    @Prop()
    endDate : Date;
    @Prop()
    status : string;
    @Prop()
    description : string;
}
export const ProgressSchema = SchemaFactory.createForClass(progress);