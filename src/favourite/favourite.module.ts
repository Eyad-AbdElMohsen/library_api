import { Module } from '@nestjs/common';
import { FavouriteController } from './favourite.controller';
import { FavouriteService } from './favourite.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Favourite } from 'src/models/favourite.model';
import { FavouriteRepository } from './favourite.repository';

@Module({
  imports: [SequelizeModule.forFeature([Favourite])],
  controllers: [FavouriteController],
  providers: [FavouriteService, FavouriteRepository]
})
export class FavouriteModule {}
