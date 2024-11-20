import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachineData } from 'src/entity/machine-data.entity';
import { MachineDataService } from './services/machine-data.service';
import { MachineDataController } from './controllers/machine-data.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MachineData])],
  providers: [MachineDataService],
  controllers: [MachineDataController],
})
export class MachineDataModule {}
