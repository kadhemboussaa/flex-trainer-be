import { Document } from 'mongoose';
import { role } from 'src/enum/role.enum';
export interface managerInterface extends Document{
  readonly role: role;
}