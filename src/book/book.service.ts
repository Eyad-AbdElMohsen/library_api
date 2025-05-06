import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './dto/CreateBook.dto';
import { UpdateBookDto } from './dto/UpdateBook.dto';
import { BookStatsRepository } from 'src/book-stats/book-stats.repository';
import { BookStatsService } from 'src/book-stats/book-stats.service';

@Injectable()
export class BookService {
    constructor(
        private readonly bookRepository: BookRepository,
        private readonly bookStatsRepository: BookStatsRepository,
        private readonly bookStatsService: BookStatsService,
    ) { }

    async createNewBook(createBookDto: CreateBookDto, image: string) {
        return await this.bookRepository.create(createBookDto, image)
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
        const res = await this.bookRepository.delete(id)
        if (!res)
            throw new HttpException('Book not Found!', HttpStatus.NOT_FOUND,);

        return { message: 'Successfully Deleted!' };
    }
}
