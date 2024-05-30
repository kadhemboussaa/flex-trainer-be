import { IsNotEmpty, IsString } from "class-validator";

export class createEventDto {
    @IsNotEmpty()
    @IsString()
    readonly eventTitle : string;

    @IsNotEmpty()
    @IsString()
    readonly description : string;    
}