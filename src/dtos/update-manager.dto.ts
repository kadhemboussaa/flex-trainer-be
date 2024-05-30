import { PartialType } from "@nestjs/mapped-types";
import { createManagerDto } from "./create-manager.dto";

export class updateManagerDto extends PartialType(createManagerDto){}