import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op, WhereOptions } from "sequelize";
import { Model, ModelCtor } from "sequelize-typescript";
import { Favourite } from "src/models/favourite.model";

@Injectable()
export class FavouriteRepository {
    constructor(
        @InjectModel(Favourite) private readonly favouriteModel: typeof Favourite
    ) { }

    async getFavourite(bookId: number, userId: number) {
        return await this.favouriteModel.findOne({ where: { bookId, userId } })
    }

    async create(bookId: number, userId: number) {
        return await this.favouriteModel.create({ bookId, userId })
    }

    async remove(favouriteBookByUser: Favourite) {
        return await favouriteBookByUser.destroy()
    }

    async getTargets(where: WhereOptions, targetModel: ModelCtor<Model>) {
        return await this.favouriteModel.findAll({
            where,
            attributes: [],
            include: targetModel
        })
    }
}