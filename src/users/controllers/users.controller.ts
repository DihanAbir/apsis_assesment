import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

import { UserService } from '../services/users.service';
import { User } from 'src/entity/user.entity';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User details', type: User })
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    description: 'User data payload',
    type: User,
    examples: {
      example1: {
        summary: 'Example payload',
        value: { emp_id: 'EMP001', name: 'John Doe', password: '12345' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: User,
  })
  async create(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.create(userData);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user and update last login time' })
  @ApiBody({
    description: 'Login payload',
    examples: {
      example1: {
        summary: 'Example payload',
        value: { emp_id: 'EMP001', password: '12345' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful, user details returned',
    type: User,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() loginData: { emp_id: string; password: string },
  ): Promise<User> {
    const { emp_id, password } = loginData;
    return this.userService.login(emp_id, password);
  }
}
