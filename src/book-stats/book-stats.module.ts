import { forwardRef, Module } from '@nestjs/common';
import { BookStatsController } from './book-stats.controller';
import { BookStatsService } from './book-stats.service';
import { BookStatsRepository } from './book-stats.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookStats } from 'src/models/book-stats.model';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([BookStats]),
    forwardRef(() => UserModule) // to avoid circular dependency between modules
  ],
  controllers: [BookStatsController],
  providers: [BookStatsService, BookStatsRepository],
  exports: [BookStatsService, BookStatsRepository]
})
export class BookStatsModule {}
