import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class createProgressDto {

    @IsDate()
    readonly startDate : Date;

    @IsDate()
    readonly endDate : Date;

    @IsString()
    @IsNotEmpty()
    readonly status : string;

    @IsNotEmpty()
    @IsString()
    readonly description : string;
}