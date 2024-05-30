import { PartialType } from "@nestjs/mapped-types";
import { createCoachDto } from "./create-coach.dto";
export class updateCoachDto extends PartialType(createCoachDto) {}