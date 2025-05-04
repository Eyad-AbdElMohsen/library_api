import { CreationOptional } from "sequelize";
import { AfterCreate, AfterDestroy, BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { Author } from "./author.model";
import { BookStats } from "./book-stats.model";

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

    @AfterCreate
    static async createBookStats(instance: Book) {
        if (!instance.id) return;
        await BookStats.create({ bookId: instance.id });
    }
    @AfterDestroy
    static async destroyBookStats(instance: Book) {
        if (!instance.id) return;
        await BookStats.destroy({ where: { bookId: instance.id } });
    }

    @Column({ type: DataType.DATE })
    declare createdAt: CreationOptional<Date>;

    @Column({ type: DataType.DATE })
    declare updatedAt: CreationOptional<Date>;
}