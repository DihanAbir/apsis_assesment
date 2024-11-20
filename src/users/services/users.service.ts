import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async login(emp_id: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { emp_id } });

    if (!user) {
      throw new UnauthorizedException('Invalid employee ID');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid password');
    }

    // Update last login time
    user.last_login = new Date();
    await this.userRepository.save(user);

    return user;
  }
}
