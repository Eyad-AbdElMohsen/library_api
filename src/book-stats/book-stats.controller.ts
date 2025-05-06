import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { BookStatsService } from './book-stats.service';
import { UpsertRatingBookDto } from './dto/UpsertRatingBook.dto';
import { AuthGuard } from 'src/common/gaurds/Auth.gaurd';
import { JwtPayload } from 'src/user/dto/JwtPayload.dto';

@Controller('book-stats')
export class BookStatsController {
    constructor(private readonly bookStatsService: BookStatsService) { }

    @Get(':bookId')
    getBookStats(@Param('bookId', ParseIntPipe) bookId: number) {
        return this.bookStatsService.getBookStats(bookId)
    }

    @Patch(':bookId/likes')
    @UseGuards(AuthGuard)
    updateBookLikes(
        @Request() req: { user: JwtPayload },
        @Param('bookId', ParseIntPipe) bookId: number
    ) {
        const userId = req.user.id
        return this.bookStatsService.updateBookLikes(bookId, userId);
    }

    @Post(':bookId/ratings')
    @UseGuards(AuthGuard)
    rateUserBook(
        @Request() req: { user: JwtPayload },
        @Param('bookId', ParseIntPipe) bookId: number,
        @Body() upsertRatingBookDto: UpsertRatingBookDto
    ) {
        const userId = req.user.id
        return this.bookStatsService.rateUserBook(bookId, userId, upsertRatingBookDto.rating)
    }

    @Get(':bookId/views')
    getBookViews(@Param('bookId', ParseIntPipe) bookId: number) {
        return this.bookStatsService.getBookViews(bookId)
    }

    @Get(':bookId/likes')
    getBookLikes(@Param('bookId', ParseIntPipe) bookId: number) {
        return this.bookStatsService.getBookLikes(bookId)
    }

    @Get(':bookId/rates')
    getBookRates(@Param('bookId', ParseIntPipe) bookId: number) {
        return this.bookStatsService.getBookRates(bookId)
    }
}
