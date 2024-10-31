import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from './work.entity';
import { WorkService } from './work.service';
import { WorkController } from './work.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Work]),
    MulterModule.register({
      dest: './uploads/images', // Default destination for uploaded images
    }),
  ],
  providers: [WorkService],
  controllers: [WorkController],
})
export class WorkModule {}
