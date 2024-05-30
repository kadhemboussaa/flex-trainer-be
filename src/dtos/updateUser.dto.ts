import { PartialType } from "@nestjs/mapped-types";
import { BaseUserDto } from "./create-base-user.dto";

export class UpdateUSerDto extends PartialType(BaseUserDto){}