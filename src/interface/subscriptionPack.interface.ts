import { Document } from 'mongoose';
export interface subscriptionPackInterface extends Document{
  readonly packTitle: string;
  readonly description: string;
  readonly price: number;
}