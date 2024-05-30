import { IsNotEmpty, IsString } from "class-validator";

export class createTrainingSessionDto {
    @IsNotEmpty()
    @IsString()
    readonly trainingSessionTitle : string;

    @IsNotEmpty()
    @IsString()
    readonly description : string;

}