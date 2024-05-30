import { Document } from 'mongoose';
export interface collectiveLessonInterface extends Document{
  readonly lessonTitle: string;
  readonly description: string;
}