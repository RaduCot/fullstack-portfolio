import { Test, TestingModule } from '@nestjs/testing';
import { WorkService } from './work.service';
import { Work } from './work.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import * as fs from 'fs';

jest.mock('fs'); // Mock fs module to avoid actual file operations

describe('WorkService', () => {
  let service: WorkService;
  let repository: Repository<Work>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkService,
        {
          provide: getRepositoryToken(Work),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<WorkService>(WorkService);
    repository = module.get<Repository<Work>>(getRepositoryToken(Work));

    jest.clearAllMocks(); // Clear mock history before each test
  });

  describe('create', () => {
    it('should create and return a work entry', async () => {
      const createWorkDto: CreateWorkDto = {
        title: 'New Project',
        description: 'Test Description',
      };
      const savedWork = { id: 1, ...createWorkDto };

      jest.spyOn(repository, 'create').mockReturnValue(savedWork as Work);
      jest.spyOn(repository, 'save').mockResolvedValue(savedWork as Work);

      const result = await service.create(createWorkDto);
      expect(result).toEqual(savedWork);
    });
  });

  describe('findAll', () => {
    it('should return all work entries', async () => {
      const workArray = [
        { id: 1, title: 'Work1' },
        { id: 2, title: 'Work2' },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(workArray as Work[]);

      const result = await service.findAll();
      expect(result).toEqual(workArray);
    });
  });

  describe('findOne', () => {
    it('should return a work entry by ID', async () => {
      const work = { id: 1, title: 'Test Work' };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(work as Work);

      const result = await service.findOne(1);
      expect(result).toEqual(work);
    });

    it('should throw NotFoundException if work entry is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a work entry and return the updated entry', async () => {
      const existingWork = {
        id: 1,
        title: 'Existing Work',
      };
      const updateData = { title: 'Updated Work' };
      const updatedWork = { ...existingWork, ...updateData };

      // Mock the findOne method to return the existing work
      jest.spyOn(service, 'findOne').mockResolvedValue(existingWork as Work);

      // Mock the repository's update method
      jest.spyOn(repository, 'update').mockResolvedValue(null);

      // Mock the findOne method again to return the updated work
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(updatedWork as Work);

      const result = await service.update(1, updateData);
      expect(result).toEqual(updatedWork); // Expect the result to match the updated work
    });
  });

  describe('remove', () => {
    it('should remove a work entry by ID', async () => {
      const work = { id: 1, title: 'Test Work', image_url: 'image.jpg' };

      jest.spyOn(service, 'findOne').mockResolvedValue(work as Work);
      jest.spyOn(repository, 'delete').mockResolvedValue(null);

      // Mock fs.unlink for image deletion
      (fs.unlink as unknown as jest.Mock).mockImplementation(
        (path, callback) => {
          callback(null);
        },
      );

      await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});
