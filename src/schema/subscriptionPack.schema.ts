import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class SubscriptionPack {
    @Prop()
    packTitle: string
    @Prop()
    description : string
    @Prop()
    price: number;
}
export const SubscriptionPackSchema = SchemaFactory.createForClass(SubscriptionPack);