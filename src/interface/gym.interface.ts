import { Document } from 'mongoose';
export interface gymInterface extends Document{
  readonly gymName: string;
  readonly address: string;
}