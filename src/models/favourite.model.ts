import { CreationOptional } from "sequelize";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Book } from "./book.model";
import { User } from "./user.model";


@Table
export class Favourite extends Model{
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    declare id: CreationOptional<number>

    @ForeignKey(() => Book)
    @Column({ type: DataType.INTEGER, allowNull: false })
    bookId: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;
    
    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Book)
    book: Book;

    @Column({ type: DataType.DATE })
    declare createdAt: CreationOptional<Date>;

    @Column({ type: DataType.DATE })
    declare updatedAt: CreationOptional<Date>;
}