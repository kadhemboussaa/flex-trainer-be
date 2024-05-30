import { PartialType } from "@nestjs/mapped-types";
import { createTrainingSessionDto } from "./create-trainingSession.dto";

export class updateTrainingSessionDto extends PartialType(createTrainingSessionDto){}