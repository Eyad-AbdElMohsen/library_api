import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from 'src/models/book.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookRepository } from './book.repository';

@Module({
  imports: [SequelizeModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookService, BookRepository]
})
export class BookModule {}
