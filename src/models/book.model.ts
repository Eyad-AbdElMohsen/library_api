import { CreationOptional } from "sequelize";
import {
    AfterCreate,
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    HasOne,
    Model,
    Table
} from "sequelize-typescript";
import { Author } from "./author.model";
import { BookStats } from "./book-stats.model";
import { User } from "./user.model";
import { Favourite } from "./favourite.model";
import { OwnedBook } from "./ownedBook.model";
import { HttpException, HttpStatus } from "@nestjs/common";

@Table
export class Book extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    declare id: CreationOptional<number>

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    title: string

    @Column({ type: DataType.ENUM('Fiction', 'Historical', 'Horror'), allowNull: false })
    category: string

    @Column({ type: DataType.DATE, allowNull: true, defaultValue: () => new Date() })
    publishedYear: Date

    @Column({ type: DataType.STRING, allowNull: true })
    image: string;

    @ForeignKey(() => Author)
    @Column({ type: DataType.INTEGER, allowNull: false })
    authorId: number;
    @BelongsTo(() => Author)
    author: Author;

    @HasOne(() => BookStats)
    bookStats: BookStats;

    @HasMany(() => Favourite)
    favourites: Favourite[];

    @HasMany(() => OwnedBook)
    ownedBooks: OwnedBook[];

    @BelongsToMany(() => User, () => Favourite)
    favouritedByUsers: User[];

    @BelongsToMany(() => User, () => OwnedBook)
    owners: User[];

    @AfterCreate
    static async createBookStats(instance: Book, options: any) {
        const transaction = options.transaction
        if (!transaction) {
            throw new Error('Transaction is required for "createBookStats" hook');
        }
        try {
            await BookStats.create(
                { bookId: instance.dataValues.id },
                { transaction }
            );
            await transaction.commit();
        } catch (err) {
            console.log('Error in creating a book stats: ', err)
            await transaction.rollback();
            throw new HttpException('Transaction field, pls try again', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // @AfterDestroy
    // static async removeBookStats(instance: Book, options: any) {
    //     const transaction = options.transaction
    //     if (!transaction) {
    //         throw new Error('Transaction is required for "removeBookStats" hook');
    //     }
    //     await BookStats.destroy({
    //         where: { bookId: instance.id },
    //         transaction
    //     });
    // }

    @Column({ type: DataType.DATE })
    declare createdAt: CreationOptional<Date>;

    @Column({ type: DataType.DATE })
    declare updatedAt: CreationOptional<Date>;
}