import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "src/models/user.model";
import { UserRepository } from "./user.repository";
import { BookStatsModule } from "src/book-stats/book-stats.module";

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    forwardRef(() => BookStatsModule)
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository]
})
export class UserModule { }
