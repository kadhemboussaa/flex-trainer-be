import { IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class createProgressDto {
  @IsNotEmpty()
  @IsString()
  readonly coachId: string;

  @IsNotEmpty()
  @IsString()
  readonly clientId: string;

  @IsDateString()
  readonly startDate: string;

  @IsDateString()
  readonly endDate: string;

  @IsString()
  @IsNotEmpty()
  readonly status: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
