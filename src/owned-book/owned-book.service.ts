import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Target } from 'src/common/types/target.type';
import { Book } from 'src/models/book.model';
import { OwnedBookRepository } from 'src/owned-book/owned-book.repository';
import { User } from 'src/models/user.model';

@Injectable()
export class OwnedBookService {
    constructor(private readonly ownedBookRepository: OwnedBookRepository) { }

    async addBookForUser(bookId: number, userId: number) {
        const checkExistance = await this.ownedBookRepository.get(bookId, userId)
        if (checkExistance)
            throw new HttpException('User already owned this book before!', HttpStatus.BAD_REQUEST)
        return await this.ownedBookRepository.create(bookId, userId)
    }

    async getOwnTargets(target: Target, id: number) {
        try{
            const targetModel = target == 'users' ? Book : User
            const where = targetModel == Book ? { userId: id } : { bookId: id }
            return await this.ownedBookRepository.getTargets(where, targetModel)
        }catch(err){
            console.log(err)
            throw new HttpException('User or Book not found', HttpStatus.NOT_FOUND);
        }
    }
}
