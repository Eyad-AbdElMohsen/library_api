import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FavouriteRepository } from './favourite.repository';
import { User } from 'src/models/user.model';
import { Book } from 'src/models/book.model';
import { Target } from 'src/common/types/target.type';

@Injectable()
export class FavouriteService {
    constructor(private readonly favouriteRepository: FavouriteRepository){}

    async updateBookFavourite(bookId: number, userId: number){
        try {
            const favouriteBookByUser = await this.favouriteRepository.getFavourite(bookId, userId)
            if(favouriteBookByUser){
                return await this.favouriteRepository.remove(favouriteBookByUser)
            }
            return await this.favouriteRepository.create(bookId, userId)
          } catch (err) {
            throw new HttpException('User or Book not found', HttpStatus.NOT_FOUND);
        }
    }
    
    async getFavouriteTargets(target: Target, id: number){
        try{
            const targetModel = target == 'users' ? Book : User
            const where = targetModel == Book ? { userId: id } : { bookId: id };
            return await this.favouriteRepository.getTargets(where, targetModel)
        }catch(err){
            throw new HttpException('User or Book not found', HttpStatus.NOT_FOUND);
        }
    }

}
