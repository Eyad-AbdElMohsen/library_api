import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op, where } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { BookStats } from "src/models/book-stats.model";
import { User } from "src/models/user.model";

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

    async removeUser(userId: number) {
        await BookStats.update({
            likes: Sequelize.fn('array_remove', Sequelize.col('likes'), userId),
            views: Sequelize.fn('array_remove', Sequelize.col('views'), userId),
            raters: Sequelize.fn('array_remove', Sequelize.col('raters'), userId)
        }, {
            where: {
                [Op.or]: [
                    { likes: { [Op.contains]: [userId] } },
                    { views: { [Op.contains]: [userId] } },
                    { raters: { [Op.contains]: [userId] } }
                ]
            }
        });
    }

}