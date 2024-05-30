import { Document } from 'mongoose';
export interface trainingSessionInterface extends Document{
  readonly trainigSessionTitle: string;
  readonly description: string; 
}