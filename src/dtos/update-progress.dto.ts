import { PartialType } from "@nestjs/mapped-types";
import { createProgressDto } from "./create-progress.dto";

export class updateProgressDto extends PartialType(createProgressDto){}