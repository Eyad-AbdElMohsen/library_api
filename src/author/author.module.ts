import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { AuthorRepository } from './author.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from 'src/models/author.model';

@Module({
  imports: [SequelizeModule.forFeature([Author])],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorRepository]
})
export class AuthorModule {}
