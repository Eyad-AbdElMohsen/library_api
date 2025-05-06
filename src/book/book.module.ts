import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from 'src/models/book.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookRepository } from './book.repository';
import { BookStatsModule } from 'src/book-stats/book-stats.module';
import { Favourite } from 'src/models/favourite.model';
import { OwnedBook } from 'src/models/ownedBook.model';
import { User } from 'src/models/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Book, Favourite, OwnedBook, User]),
    BookStatsModule
  ],
  controllers: [BookController],
  providers: [BookService, BookRepository]
})
export class BookModule { }
