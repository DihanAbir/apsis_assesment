import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMachineDto {
  @IsNotEmpty()
  @IsString()
  machine_name: string;

  @IsNotEmpty()
  @IsString()
  machine_type: string;
}
