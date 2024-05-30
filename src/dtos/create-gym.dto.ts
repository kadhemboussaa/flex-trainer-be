import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class createGymDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    readonly gymName : string

    @IsNotEmpty()
    @IsString()
    readonly address: string;
}