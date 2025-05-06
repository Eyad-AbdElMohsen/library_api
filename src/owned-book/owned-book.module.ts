import { Module } from '@nestjs/common';
import { OwnedBookController } from './owned-book.controller';
import { OwnedBookService } from './owned-book.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { OwnedBook } from 'src/models/ownedBook.model';
import { OwnedBookRepository } from 'src/owned-book/owned-book.repository';

@Module({
  imports:[SequelizeModule.forFeature([OwnedBook])],
  controllers: [OwnedBookController],
  providers: [OwnedBookService, OwnedBookRepository]
})
export class OwnedBookModule {}
