import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { OwnedBook } from "../models/ownedBook.model";
import { WhereOptions } from "sequelize";
import { Model, ModelCtor } from "sequelize-typescript";


@Injectable()
export class OwnedBookRepository {
    constructor(
        @InjectModel(OwnedBook) private ownedBookModel: typeof OwnedBook
    ) { }

    async get(bookId: number, userId: number) {
        return await this.ownedBookModel.findOne({ where: { bookId, userId } })
    }

    async create(bookId: number, userId: number) {
        return await this.ownedBookModel.create({ bookId, userId })
    }

    async getTargets(where: WhereOptions, targetModel: ModelCtor<Model>){
        return await this.ownedBookModel.findAll({
            where,
            attributes:[],
            include: targetModel,
        })
    }
}