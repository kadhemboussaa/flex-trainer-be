import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class event {
    @Prop()
    eventTitle : string;
    @Prop() 
    description : string;
}

export const EventSchema = SchemaFactory.createForClass(event);