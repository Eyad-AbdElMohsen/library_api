import { CreationOptional } from "sequelize";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Book } from "./book.model";


@Table
export class BookStats extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    declare id: CreationOptional<number>

    @Column({ type: DataType.ARRAY(DataType.INTEGER), allowNull: false, defaultValue: [] })
    views: number[];

    @Column({ type: DataType.ARRAY(DataType.INTEGER), allowNull: false, defaultValue: [] })
    likes: number[];

    @Column({ type: DataType.ARRAY(DataType.INTEGER), allowNull: false, defaultValue: [] })
    raters: number[]

    @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 0 })
    averageRating: number

    @ForeignKey(() => Book)
    @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
    bookId: number;
    @BelongsTo(() => Book)
    book: Book
}