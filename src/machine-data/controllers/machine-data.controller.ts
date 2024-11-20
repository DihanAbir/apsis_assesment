import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { MachineDataService } from '../services/machine-data.service';
import { MachineData } from 'src/entity/machine-data.entity';

@ApiTags('Machine Data') // Group name for Swagger
@Controller('machine-data')
export class MachineDataController {
  constructor(private readonly machineDataService: MachineDataService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all machine data or filter by machine and date',
  })
  @ApiQuery({
    name: 'machine_id',
    type: Number,
    required: false,
    description: 'Filter data by machine ID',
  })
  @ApiQuery({
    name: 'date',
    type: String,
    required: false,
    description: 'Filter data by date (YYYY-MM-DD)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of machine data records.',
    type: [MachineData],
  })
  async findAll(@Query() query: any): Promise<MachineData[]> {
    if (query.machine_id && query.date) {
      return this.machineDataService.findByMachineAndDate(
        query.machine_id,
        query.date,
      );
    }
    return this.machineDataService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create new machine data entry' })
  @ApiBody({
    description: 'Machine data payload',
    type: MachineData,
    examples: {
      example1: {
        summary: 'Example payload',
        value: {
          date: '2024-11-20',
          q1: 'yes',
          q2: 'no',
          q3: 'yes',
          q4: '',
          q5: 'yes',
          user: { id: 1 },
          machine: { id: 1 },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created machine data entry.',
    type: MachineData,
  })
  async create(
    @Body() machineData: Partial<MachineData>,
  ): Promise<MachineData> {
    return this.machineDataService.create(machineData);
  }
}
