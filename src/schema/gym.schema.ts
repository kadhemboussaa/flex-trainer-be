import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class gym {
    @Prop()
    gymName : string;
    @Prop()
    address:string;
}
export const GymSchema = SchemaFactory.createForClass(gym);
