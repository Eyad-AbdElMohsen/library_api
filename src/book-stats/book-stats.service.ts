import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BookStatsRepository } from './book-stats.repository';

@Injectable()
export class BookStatsService {
    constructor(private readonly bookStatsRepository: BookStatsRepository) { }

    async getBookStats(bookId: number) {
        const bookStats = await this.bookStatsRepository.findByBookId(bookId)
        if (!bookStats)
            throw new HttpException('No Book Stats found!', HttpStatus.NOT_FOUND)
        return bookStats
    }

    async updateBookLikes(bookId: number, userId: number) {
        const bookStats = await this.getBookStats(bookId)
        const hasLiked = bookStats.dataValues.likes.includes(userId);
        if (!hasLiked) {
            await this.bookStatsRepository.addUserLike(bookStats, userId);
            return { message: 'Successfully liked' };
        } else {
            await this.bookStatsRepository.removeUserLike(bookStats, userId);
            return { message: 'Successfully unliked' };
        }

    }

    async handleUserView(bookId: number, userId: number) {
        const bookStats = await this.getBookStats(bookId);
        if (!bookStats.dataValues.views.includes(userId)) {
            await this.bookStatsRepository.addUserView(bookStats, userId);
        }
    }

    async rateUserBook(bookId: number, userId: number, rating: number) {
        const bookStats = await this.getBookStats(bookId);
        const averageRating = +bookStats.dataValues.averageRating
        const numberOfRatings = +bookStats.dataValues.raters.length || 0
        if (bookStats.dataValues.raters.includes(userId)) {
            throw new HttpException('User already submit his rate before', HttpStatus.BAD_REQUEST)
        }
        const newRating = ((averageRating * numberOfRatings) + rating) / (numberOfRatings + 1)
        await this.bookStatsRepository.addRate(bookId, userId, newRating)
        return { message: 'Successfully Rating Updated' };
    }
}
