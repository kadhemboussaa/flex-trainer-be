import { PartialType } from '@nestjs/mapped-types';
import { createAdminDto } from "./create-admin.dto";
export class updateAdminDto extends PartialType(createAdminDto) {}