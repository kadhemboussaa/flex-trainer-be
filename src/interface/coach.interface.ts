import { Document } from 'mongoose';
import { role } from 'src/enum/role.enum';
export interface coachInterface extends Document{
  readonly speciality: string;
  readonly role: role;
}