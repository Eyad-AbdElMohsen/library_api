import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileSizeValidationPipe } from 'src/common/pipes/multer.pipe';
import { CreateAuthorDto } from './dto/CreateAuthor.dto';
import { AuthorService } from './author.service';
import { UpdateAuthorDto } from './dto/UpdateAuthor.dto';
import { AuthorImageInterceptor } from 'src/common/interceptors/multer.interceptor';

@Controller('authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) { }

    @UseInterceptors(AuthorImageInterceptor())
    @Post()
    createAuthor(
        @UploadedFile(new FileSizeValidationPipe()) image: Express.Multer.File,
        @Body() createAuthorDto: CreateAuthorDto) {
        return this.authorService.createAuthor(createAuthorDto, image.filename)
    }

    @Get()
    async getAllAuthors() {
        return await this.authorService.getAllAuthors()
    }

    @Get(':id')
    async getAuthorById(@Param('id', ParseIntPipe) id: number) {
        return await this.authorService.getAuthorById(id)
    }

    @UseInterceptors(AuthorImageInterceptor())
    @Patch(':id')
    async updateAuthorDetails(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateAuthorDto?: UpdateAuthorDto,
        @UploadedFile(new FileSizeValidationPipe()) image?: Express.Multer.File,
    ) {
        return this.authorService.updateAuthorDetails(id, updateAuthorDto, image?.filename)
    }

    @Delete(':id')
    async deleteAuthor(@Param('id', ParseIntPipe) id: number) {
        return await this.authorService.deleteAuthor(id);
    }
}
