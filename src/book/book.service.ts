import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './dto/CreateBook.dto';
import { UpdateBookDto } from './dto/UpdateBook.dto';
import { BookStatsService } from 'src/book-stats/book-stats.service';
import { Sequelize } from 'sequelize-typescript';
import { BookStatsRepository } from 'src/book-stats/book-stats.repository';
import { Transaction } from 'sequelize';

@Injectable()
export class BookService {
    constructor(
        private readonly bookRepository: BookRepository,
        private readonly bookStatsRepository: BookStatsRepository,
        private readonly bookStatsService: BookStatsService,
        private sequelize: Sequelize
    ) { }

    async createNewBook(createBookDto: CreateBookDto, image: string) {
        const transaction: Transaction = await this.sequelize.transaction();
        try {
            const newBook = await this.bookRepository.create(createBookDto, image, transaction)
            return newBook
        } catch (err) {
            console.log('Error in creating a book: ', err)
            await transaction.rollback();
            throw new HttpException('Transaction field, pls try again', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAllBooks() {
        return await this.bookRepository.findAll()
    }

    async getBookById(id: number, userId?: number) {
        const book = await this.bookRepository.findById(id);
        if (!book)
            throw new HttpException('Book not Found!', HttpStatus.NOT_FOUND);

        if (userId) {
            await this.bookStatsService.handleUserView(id, userId);
        }

        return book;
    }

    async updateBookDetails(id: number, updateBookDetails?: UpdateBookDto, image?: string) {
        await this.getBookById(id)
        const [count, row] = await this.bookRepository.update(id, updateBookDetails, image)
        if (!count)
            throw new HttpException('No thing updated', HttpStatus.UNPROCESSABLE_ENTITY);
        return row;
    }

    async deleteBook(id: number) {
        const transaction: Transaction = await this.sequelize.transaction();
        try {
            const result = await this.bookRepository.delete(id)
            if (!result)
                throw new HttpException('Book not Found!', HttpStatus.NOT_FOUND,);
            
            await this.bookStatsRepository.delete(id)
            await transaction.commit();
            return { message: 'Successfully Deleted!' };
        } catch (err) {
            console.log('Error in vreating a book: ', err)
            await transaction.rollback();
            throw new HttpException('Transaction field, pls try again', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
