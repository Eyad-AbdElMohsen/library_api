import { Controller, Get, Param, ParseEnumPipe, ParseIntPipe, Post, Query, UseInterceptors } from '@nestjs/common';
import { OwnedBookService } from './owned-book.service';
import { Target } from 'src/common/types/target.type';
import { CustomMessageInterceptor } from 'src/common/interceptors/users-books.interceptor';

@Controller('owned-books')
export class OwnedBookController {
    constructor(private readonly ownedBookService: OwnedBookService) { }

    @Post(':bookId')
    addBookForUser(@Param('bookId', ParseIntPipe) bookId: number) {
        const userId = 1
        return this.ownedBookService.addBookForUser(bookId, userId)
    }

    @Get(':id')
    @UseInterceptors(new CustomMessageInterceptor())
    getOwnTargets(
        @Param('id', ParseIntPipe) id: number,
        @Query('target', new ParseEnumPipe(Target)) target: Target
    ) {
        return this.ownedBookService.getOwnTargets(target, id)
    }
}
