import { Module } from '@nestjs/common';
import { BookStatsController } from './book-stats.controller';
import { BookStatsService } from './book-stats.service';
import { BookStatsRepository } from './book-stats.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookStats } from 'src/models/book-stats.model';

@Module({
  imports: [SequelizeModule.forFeature([BookStats])],
  controllers: [BookStatsController],
  providers: [BookStatsService, BookStatsRepository],
  exports: [BookStatsService, BookStatsRepository]
})
export class BookStatsModule {}
