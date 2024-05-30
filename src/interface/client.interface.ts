import { Document } from 'mongoose';
import { role } from 'src/enum/role.enum';
export interface clientInterface extends Document{
  readonly role: role;
}