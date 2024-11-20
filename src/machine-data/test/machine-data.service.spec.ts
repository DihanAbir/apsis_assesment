import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MachineDataService } from '../services/machine-data.service';
import { MachineData } from 'src/entity/machine-data.entity';
import { User } from 'src/entity/user.entity';
import { Machine } from 'src/entity/machine.entity';

describe('MachineDataService', () => {
  let service: MachineDataService;
  let repo: Repository<MachineData>;
  let userRepo: Repository<User>;
  let machineRepo: Repository<Machine>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MachineDataService,
        {
          provide: getRepositoryToken(MachineData),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Machine),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MachineDataService>(MachineDataService);
    repo = module.get<Repository<MachineData>>(getRepositoryToken(MachineData));
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
    machineRepo = module.get<Repository<Machine>>(getRepositoryToken(Machine));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new machine data', async () => {
    const user = new User();
    user.id = 1;
    user.name = 'John Doe';
    user.emp_id = 'E1234';
    user.password = 'password123';

    const machine = new Machine();
    machine.id = 1;
    machine.machine_name = 'Machine A';
    machine.machine_type = 'maker';

    jest.spyOn(userRepo, 'findOne').mockResolvedValue(user);
    jest.spyOn(machineRepo, 'findOne').mockResolvedValue(machine);

    const createData = {
      date: '2024-11-20',
      q1: 'yes',
      q2: 'no',
      q3: 'yes',
      q4: '',
      q5: 'yes',
      user: user,
      machine: machine,
    };

    jest.spyOn(repo, 'save').mockResolvedValue(createData as any);

    const savedData = await service.create(createData);

    expect(savedData.date).toBe('2024-11-20');
    expect(savedData.q1).toBe('yes');
    expect(savedData.q2).toBe('no');
    expect(savedData.user).toBe(user);
    expect(savedData.machine).toBe(machine);
  });
});
