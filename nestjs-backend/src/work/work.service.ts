import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Work } from './work.entity';
import { CreateWorkDto } from './dto/create-work.dto';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const unlinkAsync = promisify(fs.unlink); // Promisify fs.unlink for easier use

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work)
    private workRepository: Repository<Work>,
  ) {}

  // Create a new work entry
  async create(createWorkDto: CreateWorkDto): Promise<Work> {
    const work = this.workRepository.create(createWorkDto);
    return this.workRepository.save(work);
  }

  // Retrieve all work entries
  async findAll(): Promise<Work[]> {
    return this.workRepository.find();
  }

  // Retrieve a single work entry by ID
  async findOne(id: number): Promise<Work> {
    const work = await this.workRepository.findOneBy({ id });
    if (!work) {
      throw new NotFoundException(`Work with ID ${id} not found`);
    }
    return work;
  }

  // Update a work entry
  async update(id: number, updateData: Partial<CreateWorkDto>): Promise<Work> {
    const existingWork = await this.findOne(id); // Retrieve existing work

    // Check if the update includes a new image and it's different from the existing one
    if (
      updateData.image_url &&
      updateData.image_url !== existingWork.image_url
    ) {
      const oldImagePath = path.join(
        __dirname,
        '..',
        '..',
        existingWork.image_url,
      ); // Path to the old image

      try {
        await unlinkAsync(oldImagePath); // Delete the old file
        console.log(`Successfully deleted image at ${oldImagePath}`);
      } catch (err) {
        console.error(`Failed to delete image at ${oldImagePath}:`, err);
      }
    }

    // Update the work entry
    await this.workRepository.update(id, updateData);
    return this.findOne(id); // Return the updated work entry
  }

  // Remove a work entry
  async remove(id: number): Promise<void> {
    const work = await this.findOne(id);
    if (work && work.image_url) {
      const imagePath = path.join(__dirname, '..', '..', work.image_url); // Path to the image

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Failed to delete image at ${imagePath}:`, err);
        } else {
          console.log(`Successfully deleted image at ${imagePath}`);
        }
      });
    }
    await this.workRepository.delete(id);
  }
}
