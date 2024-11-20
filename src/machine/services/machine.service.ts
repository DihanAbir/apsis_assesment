import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Machine } from 'src/entity/machine.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MachineService {
  constructor(
    @InjectRepository(Machine)
    private machineRepository: Repository<Machine>,
  ) {}

  async findAll(): Promise<Machine[]> {
    return this.machineRepository.find();
  }

  async findOne(id: number): Promise<Machine> {
    return this.machineRepository.findOne({ where: { id } });
  }

  async create(machineData: Partial<Machine>): Promise<Machine> {
    const machine = this.machineRepository.create(machineData);
    return this.machineRepository.save(machine);
  }
}
