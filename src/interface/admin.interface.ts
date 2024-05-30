import { Document } from 'mongoose';
import { role } from 'src/enum/role.enum';
export interface adminInterface extends Document{
  readonly role: role;
}