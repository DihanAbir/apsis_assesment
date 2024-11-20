import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MachineData } from 'src/entity/machine-data.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MachineDataService {
  constructor(
    @InjectRepository(MachineData)
    private machineDataRepository: Repository<MachineData>,
  ) {}

  async findAll(): Promise<MachineData[]> {
    return this.machineDataRepository.find({ relations: ['user', 'machine'] });
  }

  async findByMachineAndDate(
    machineId: number,
    date: string,
  ): Promise<MachineData[]> {
    return this.machineDataRepository.find({
      where: { machine: { id: machineId }, date },
      relations: ['user', 'machine'],
    });
  }

  async create(machineData: Partial<MachineData>): Promise<MachineData> {
    const newMachineData = this.machineDataRepository.create(machineData);
    return this.machineDataRepository.save(newMachineData);
  }
}
