import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Machine } from 'src/entity/machine.entity';
import { MachineService } from './services/machine.service';
import { MachineController } from './controllers/machine.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Machine])],
  providers: [MachineService],
  controllers: [MachineController],
})
export class MachineModule {}
