import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BookStatsService } from './book-stats.service';
import { UpsertRatingBookDto } from './dto/UpsertRatingBook.dto';

@Controller('book-stats')
export class BookStatsController {
    constructor(private readonly bookStatsService: BookStatsService) { }

    @Get(':bookId')
    getBookStats(@Param('bookId', ParseIntPipe) bookId: number) {
        return this.bookStatsService.getBookStats(bookId)
    }

    @Patch(':bookId/likes')
    updateBookLikes(@Param('bookId', ParseIntPipe) bookId: number) {
        const userId = 2    // userId should be from Gaurd
        return this.bookStatsService.updateBookLikes(bookId, userId);
    }

    @Post(':bookId/ratings')
    rateUserBook(
        @Param('bookId', ParseIntPipe) bookId: number,
        @Body() upsertRatingBookDto: UpsertRatingBookDto
    ) {
        const userId = 2    // userId should be from Gaurd
        return this.bookStatsService.rateUserBook(bookId, userId, upsertRatingBookDto.rating)
    }

    @Get(':bookId/views')
    getBookViews(@Param('bookId', ParseIntPipe) bookId: number){
        return this.bookStatsService.getBookViews(bookId)
    }

    @Get(':bookId/likes')
    getBookLikes(@Param('bookId', ParseIntPipe) bookId: number){
        return this.bookStatsService.getBookLikes(bookId)
    }

    @Get(':bookId/rates')
    getBookRates(@Param('bookId', ParseIntPipe) bookId: number){
        return this.bookStatsService.getBookRates(bookId)
    }
}
