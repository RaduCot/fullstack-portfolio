import { Controller, Get, Post, Body, Param, Patch, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { WorkService } from './work.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { Work } from './work.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('works')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  // New endpoint for image upload
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/images', // Destination folder for images
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, uniqueSuffix + extname(file.originalname)); // Unique filename
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) { // Ensure to specify the type here
    if (!file) {
      throw new Error('File is not provided');
    }
    return {
      success: true,
      imagePath: `uploads/images/${file.filename}`, // Return the relative path
    };
  }

  @Post()
  async create(@Body() createWorkDto: CreateWorkDto): Promise<Work> {
    return this.workService.create(createWorkDto);
  }

  @Get()
  async findAll(): Promise<Work[]> {
    return this.workService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Work> {
    return this.workService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateData: Partial<CreateWorkDto>): Promise<Work> {
    return this.workService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.workService.remove(id);
  }
}
