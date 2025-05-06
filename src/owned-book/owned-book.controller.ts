import { Controller, Get, Param, ParseEnumPipe, ParseIntPipe, Post, Query, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { OwnedBookService } from './owned-book.service';
import { Target } from 'src/common/types/target.type';
import { CustomMessageInterceptor } from 'src/common/interceptors/users-books.interceptor';
import { JwtPayload } from 'src/user/dto/JwtPayload.dto';
import { AuthGuard } from 'src/common/gaurds/Auth.gaurd';

@Controller('owned-books')
export class OwnedBookController {
    constructor(private readonly ownedBookService: OwnedBookService) { }

    @Post(':bookId')
    @UseGuards(AuthGuard)
    addBookForUser(
        @Request() req: { user: JwtPayload },
        @Param('bookId', ParseIntPipe
        ) bookId: number) {
        const userId = req.user.id
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
