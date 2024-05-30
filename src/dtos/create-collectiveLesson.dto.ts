import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class createCollectiveLessonDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    readonly lessonTitle : string;

    @IsNotEmpty()
    @IsNotEmpty()
    readonly description: string;

}