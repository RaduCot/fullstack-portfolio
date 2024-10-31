import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkModule } from './work/work.module';
import { StaticModule } from './static/static.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'portfolio',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],  // Automatically load entities
      synchronize: true,
    }),
    WorkModule,  // Include the WorkModule
    StaticModule,  // Include the StaticModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
