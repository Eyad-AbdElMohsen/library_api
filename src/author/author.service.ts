import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/CreateAuthor.dto';
import { AuthorRepository } from './author.repository';
import { UpdateAuthorDto } from './dto/UpdateAuthor.dto';

@Injectable()
export class AuthorService {
    constructor(private readonly authorRepository: AuthorRepository) { }

    async createAuthor(createAuthorDto: CreateAuthorDto, image: string) {
        return await this.authorRepository.create(createAuthorDto, image)
    }

    async getAllAuthors() {
        return await this.authorRepository.findAll()
    }

    async getAuthorById(id: number) {
        const author = await this.authorRepository.findById(id)
        if(!author)
            throw new HttpException('Author not Found', HttpStatus.NOT_FOUND)

        return author
    }

    async updateAuthorDetails(id: number, updateAuthorDto?: UpdateAuthorDto, image?: string) {
        await this.getAuthorById(id)
        const [count, row] = await this.authorRepository.update(id, updateAuthorDto, image)
        if(!count)
            throw new HttpException('No thing updated', HttpStatus.UNPROCESSABLE_ENTITY);
        return row;
    
    }

    async deleteAuthor(id: number) {
        const res = await this.authorRepository.delete(id)
        if (!res)
          throw new HttpException('Author not Found', HttpStatus.NOT_FOUND,);
    
        return { message: 'Successfully Deleted!' };
    }
}
