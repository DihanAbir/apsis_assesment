import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { MachineData } from './machine-data.entity';

@Entity('machines')
export class Machine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  machine_name: string;

  @Column()
  machine_type: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => MachineData, (machineData) => machineData.machine)
  machineData: MachineData[];
}
