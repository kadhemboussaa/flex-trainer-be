import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createSubscriptionPackDto {
    @IsNotEmpty()
    @IsString()
    readonly packName: string;

    @IsNotEmpty()
    @IsString()
    readonly description : string;
    
    @IsNumber()
    readonly price : number; 
}