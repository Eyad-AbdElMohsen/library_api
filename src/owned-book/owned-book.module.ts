import { Module } from '@nestjs/common';
import { OwnedBookController } from './owned-book.controller';
import { OwnedBookService } from './owned-book.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { OwnedBook } from 'src/models/ownedBook.model';
import { OwnedBookRepository } from 'src/owned-book/owned-book.repository';
import { JWT } from 'src/utils/jwt';

@Module({
  imports:[SequelizeModule.forFeature([OwnedBook])],
  controllers: [OwnedBookController],
  providers: [OwnedBookService, OwnedBookRepository, JWT]
})
export class OwnedBookModule {}
