import { Controller, Get, Param, ParseEnumPipe, ParseIntPipe, Patch, Query, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { Target } from '../common/types/target.type';
import { CustomMessageInterceptor } from 'src/common/interceptors/users-books.interceptor';
import { AuthGuard } from 'src/common/gaurds/Auth.gaurd';
import { JwtPayload } from 'src/user/dto/JwtPayload.dto';

@Controller('favourites')
export class FavouriteController {
    constructor(private readonly favouriteService: FavouriteService){}

    @Patch(':bookId')
    @UseGuards(AuthGuard)
    updateBookFavourite(
        @Request() req: { user: JwtPayload },
        @Param('bookId', ParseIntPipe
        ) bookId: number){
        const userId = req.user.id
        return this.favouriteService.updateBookFavourite(bookId, userId)
    }
    
    @Get(':id')
    @UseInterceptors(new CustomMessageInterceptor())
    getFavouriteTargets(
        @Param('id', ParseIntPipe)id: number,
        @Query('target', new ParseEnumPipe(Target))target: Target
    ){
        return this.favouriteService.getFavouriteTargets(target, id)
    }

}
