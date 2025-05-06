import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "src/models/user.model";
import { UserRepository } from "./user.repository";
import { BookStatsModule } from "src/book-stats/book-stats.module";
import { Favourite } from "src/models/favourite.model";
import { OwnedBook } from "src/models/ownedBook.model";
import { Book } from "src/models/book.model";

@Module({
  imports: [
    SequelizeModule.forFeature([User, Favourite, OwnedBook, Book]),
    forwardRef(() => BookStatsModule)
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository]
})
export class UserModule { }
