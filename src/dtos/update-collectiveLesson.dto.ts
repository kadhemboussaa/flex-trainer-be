import { PartialType } from "@nestjs/mapped-types";
import { createCollectiveLessonDto } from './create-collectiveLesson.dto';

export class updateCollectiveLessonDto extends PartialType(createCollectiveLessonDto){}