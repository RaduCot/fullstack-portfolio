import { Test, TestingModule } from '@nestjs/testing';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { NotFoundException } from '@nestjs/common';

describe('WorkController', () => {
  let controller: WorkController;
  let service: WorkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkController],
      providers: [
        {
          provide: WorkService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            uploadImage: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WorkController>(WorkController);
    service = module.get<WorkService>(WorkService);
  });

  describe('create', () => {
    it('should create a work entry', async () => {
      const createWorkDto: CreateWorkDto = { title: 'New Project' };
      const createdWork = { id: 1, ...createWorkDto };

      jest.spyOn(service, 'create').mockResolvedValue(createdWork as any);

      const result = await controller.create(createWorkDto);
      expect(result).toEqual(createdWork);
    });
  });

  describe('findAll', () => {
    it('should return all work entries', async () => {
      const works = [
        { id: 1, title: 'Work1' },
        { id: 2, title: 'Work2' },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(works as any[]);

      const result = await controller.findAll();
      expect(result).toEqual(works);
    });
  });

  describe('findOne', () => {
    it('should return a single work entry by ID', async () => {
      const work = { id: 1, title: 'Work1' };

      jest.spyOn(service, 'findOne').mockResolvedValue(work as any);

      const result = await controller.findOne(1);
      expect(result).toEqual(work);
    });

    it('should throw NotFoundException if work is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a work entry', async () => {
      const updateData = { title: 'Updated Title' };
      const updatedWork = { id: 1, ...updateData };

      jest.spyOn(service, 'update').mockResolvedValue(updatedWork as any);

      const result = await controller.update(1, updateData);
      expect(result).toEqual(updatedWork);
    });
  });

  describe('remove', () => {
    it('should remove a work entry by ID', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove(1);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
