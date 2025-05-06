import { Module } from '@nestjs/common';
import { OwnedBookController } from './owned-book.controller';
import { OwnedBookService } from './owned-book.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { OwnedBook } from 'src/models/ownedBook.model';

@Module({
  imports:[SequelizeModule.forFeature([OwnedBook])],
  controllers: [OwnedBookController],
  providers: [OwnedBookService]
})
export class OwnedBookModule {}
