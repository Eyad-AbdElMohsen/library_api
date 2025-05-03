import { Injectable } from "@nestjs/common";
import { CreateAuthorDto } from "./dto/CreateAuthor.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Author } from "src/models/author.model";
import { UpdateAuthorDto } from "./dto/UpdateAuthor.dto";



@Injectable()
export class AuthorRepository {
    constructor(@InjectModel(Author) private authorModel: typeof Author) { }

    async create(createAuthorDto: CreateAuthorDto, image: string) {
        const { email, name } = createAuthorDto
        return await this.authorModel.create({ email, name, image })
    }

    async findAll() {
        return await this.authorModel.findAll()
    }

    async findById(id: number) {
        return await this.authorModel.findByPk(id)
    }

    async update(id: number, updateUserDto?: UpdateAuthorDto, image?: string) {
        return await this.authorModel.update({
            name: updateUserDto?.name,
            image
        }, {
            where: { id },
            returning: true
        }
        )
    }

    async delete(id: number) {
        return await this.authorModel.destroy({ where: { id } })
    }
}