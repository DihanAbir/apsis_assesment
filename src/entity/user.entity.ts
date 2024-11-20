import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { MachineData } from './machine-data.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  emp_id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', nullable: true })
  last_login: Date;

  @CreateDateColumn()
  last_pass_update: Date;

  @OneToMany(() => MachineData, (machineData) => machineData.user)
  machineData: MachineData[];
}
