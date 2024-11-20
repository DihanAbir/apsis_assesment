import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { MachineService } from '../services/machine.service';
import { Machine } from 'src/entity/machine.entity';

@ApiTags('Machines') // Group name for Swagger
@Controller('machines')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Get()
  @ApiOperation({ summary: 'Get all machines' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of machines.',
    type: [Machine],
  })
  async findAll(): Promise<Machine[]> {
    return this.machineService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific machine by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the machine to retrieve',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the machine.',
    type: Machine,
  })
  @ApiResponse({
    status: 404,
    description: 'Machine not found.',
  })
  async findOne(@Param('id') id: number): Promise<Machine> {
    return this.machineService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new machine' })
  @ApiBody({
    description: 'Data for creating a new machine',
    type: Machine,
    examples: {
      machine: {
        summary: 'Example machine',
        value: {
          machine_name: 'Machine A',
          machine_type: 'maker',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a new machine.',
    type: Machine,
  })
  async create(@Body() machineData: Partial<Machine>): Promise<Machine> {
    return this.machineService.create(machineData);
  }
}
