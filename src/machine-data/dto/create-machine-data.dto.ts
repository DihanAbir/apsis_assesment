import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateMachineDataDto {
  @IsNotEmpty()
  machine_id: number;

  @IsNotEmpty()
  user_id: number;

  @IsDateString()
  date: string;

  q1?: string;
  q2?: string;
  q3?: string;
  q4?: string;
  q5?: string;
}
