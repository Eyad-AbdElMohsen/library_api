import { CreationOptional } from "sequelize";
import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import { Book } from "./book.model";


@Table
export class Author extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    declare id: CreationOptional<number>
  
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email: string;
  
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: true })
    image: string;

    @HasMany(() => Book)
    book: Book

    @Column({ type: DataType.DATE })
    declare createdAt: CreationOptional<Date>;
  
    @Column({ type: DataType.DATE })
    declare updatedAt: CreationOptional<Date>;
}