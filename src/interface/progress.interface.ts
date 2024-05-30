import { Document } from 'mongoose';
export interface progressInterface extends Document{
  readonly startDate: Date;
  readonly endDate: Date;
  readonly status: string;
  readonly description: string;
}