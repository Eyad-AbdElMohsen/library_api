import { CreationOptional } from "sequelize";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Author } from "./author.model";

@Table
export class Book extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    declare id: CreationOptional<number>

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    title: string

    @Column({ type: DataType.ENUM('Fiction', 'Historical', 'Horror'), allowNull: false })
    category: string

    @Column({ type: DataType.DATE, allowNull: false, defaultValue: () => new Date() })
    publishedYear: Date

    @Column({ type: DataType.STRING, allowNull: true })
    image: string;

    @ForeignKey(() => Author)
    @Column({ type: DataType.INTEGER, allowNull: false })
    authorId: number;
    @BelongsTo(() => Author)
    author: Author;

    @Column({ type: DataType.DATE })
    declare createdAt: CreationOptional<Date>;

    @Column({ type: DataType.DATE })
    declare updatedAt: CreationOptional<Date>;
}