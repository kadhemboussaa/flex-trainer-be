import { SetMetadata } from '@nestjs/common';
import { role } from '../enum/role.enum';

export const ROLES_KEY = 'role';
export const Roles = (...roles: role[]) => SetMetadata(ROLES_KEY, roles);