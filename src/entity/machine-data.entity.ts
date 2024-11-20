import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Machine } from './machine.entity';

@Entity('machine_data')
export class MachineData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column({ nullable: true })
  q1: string;

  @Column({ nullable: true })
  q2: string;

  @Column({ nullable: true })
  q3: string;

  @Column({ nullable: true })
  q4: string;

  @Column({ nullable: true })
  q5: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.machineData)
  user: User;

  @ManyToOne(() => Machine, (machine) => machine.machineData)
  machine: Machine;
}
