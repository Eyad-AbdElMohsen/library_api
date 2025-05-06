import { Controller, Get, Param, ParseEnumPipe, ParseIntPipe, Patch, Query, UseInterceptors } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { Target } from '../common/types/target.type';
import { CustomMessageInterceptor } from 'src/common/interceptors/users-books.interceptor';

@Controller('favourites')
export class FavouriteController {
    constructor(private readonly favouriteService: FavouriteService){}

    @Patch(':bookId')
    updateBookFavourite(@Param('bookId', ParseIntPipe) bookId: number){
        const userId = 1 // gaurd
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
