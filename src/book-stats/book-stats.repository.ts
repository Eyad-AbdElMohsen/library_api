import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { where } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { BookStats } from "src/models/book-stats.model";

@Injectable()
export class BookStatsRepository {
    constructor(
        @InjectModel(BookStats) private BookStatsModel: typeof BookStats
    ) { }

    async findByBookId(bookId: number) {
        return await this.BookStatsModel.findOne({ where: { bookId } })
    }

    async addUserLike(bookStats: BookStats, userId: number) {
        return await bookStats.update({
            likes: Sequelize.fn('array_append', Sequelize.col('likes'), userId)
        })
    }

    async removeUserLike(bookStats: BookStats, userId: number) {
        return await bookStats.update({
            likes: Sequelize.fn('array_remove', Sequelize.col('likes'), userId)
        })
    }

    async addUserView(bookStats: BookStats, userId: number) {
        return await bookStats.update({
            views: Sequelize.fn('array_append', Sequelize.col('views'), userId)
        });
    }

    async addRate(bookId: number, userId: number, averageRating: number) {
        return await this.BookStatsModel.update(
            {
                averageRating,
                raters: Sequelize.fn('array_append', Sequelize.col('raters'), userId) 
            },
            { where: { bookId } }
        );
    }
}