import { InjectModel } from "@nestjs/sequelize";
import { Book } from "src/models/book.model";
import { CreateBookDto } from "./dto/CreateBook.dto";
import { UpdateBookDto } from "./dto/UpdateBook.dto";


export class BookRepository {
    constructor(@InjectModel(Book) private bookModel: typeof Book) { }

    async create(createBookDto: CreateBookDto, image: string, transaction: any) {
        const { title, category, publishedYear, authorId } = createBookDto
        return await this.bookModel.create(
            { title, category, publishedYear, authorId, image },
            { transaction }
        )
    }

    async findAll() {
        return await this.bookModel.findAll()
    }

    async findById(id: number) {
        return this.bookModel.findByPk(id)
    }

    async update(id: number, updateBookDetails?: UpdateBookDto, image?: string) {
        return this.bookModel.update({
            title: updateBookDetails?.title,
            category: updateBookDetails?.category,
            publishedYear: updateBookDetails?.publishedYear,
            authorId: updateBookDetails?.authorId,
            image
        }, {
            where: { id },
            returning: true
        })
    }

    async delete(id: number) {
        return this.bookModel.destroy({ where: { id } })
    }
}