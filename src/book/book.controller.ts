import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/CreateBook.dto';
import { AuthorImageInterceptor } from 'src/common/interceptors/multer.interceptor';
import { FileSizeValidationPipe } from 'src/common/pipes/multer.pipe';
import { UpdateBookDto } from './dto/UpdateBook.dto';
import { AuthGuard } from 'src/common/gaurds/Auth.gaurd';
import { JwtPayload } from 'src/user/dto/JwtPayload.dto';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @UseInterceptors(AuthorImageInterceptor())
    @Post()
    createNewBook(
        @UploadedFile(new FileSizeValidationPipe()) image: Express.Multer.File,
        @Body() createBookDto: CreateBookDto
    ) {
        return this.bookService.createNewBook(createBookDto, image.filename)
    }

    @Get()
    getAllBooks() {
        return this.bookService.getAllBooks()
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getBookById(
        @Request() req: { user: JwtPayload },
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.bookService.getBookById(id, req.user.id)
    }

    @UseInterceptors(AuthorImageInterceptor())
    @Patch(":id")
    updateBookDetails(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateBookDto?: UpdateBookDto,
        @UploadedFile(new FileSizeValidationPipe()) image?: Express.Multer.File,
    ){
        return this.bookService.updateBookDetails(id, updateBookDto, image?.filename)
    }

    @Delete(':id')
    deleteBook(@Param('id', ParseIntPipe) id: number) {
        return this.bookService.deleteBook(id)
    }
}
