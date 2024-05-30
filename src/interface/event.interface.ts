import { Document } from 'mongoose';
export interface eventInterface extends Document{
  readonly eventTitle: string;
  readonly description: string;
}