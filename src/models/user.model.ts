import { CreationOptional, Op, Sequelize, where } from "sequelize";
import { Table, Model, Column, DataType, BelongsToMany, HasMany } from "sequelize-typescript";
import { Book } from "./book.model";
import { Favourite } from "./favourite.model";
import { OwnedBook } from "./ownedBook.model";

@Table
export class User extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    declare id: CreationOptional<number>

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @HasMany(() => Favourite)
    favourites: Favourite[];
  
    @HasMany(() => OwnedBook)
    ownedBooksDetails: OwnedBook[];
    
    @BelongsToMany(() => Book, () => Favourite)
    favouritedBooks: Book[];
  
    @BelongsToMany(() => Book, () => OwnedBook)
    ownedBooks: Book[];
  
    @Column({ type: DataType.DATE })
    declare createdAt: CreationOptional<Date>;

    @Column({ type: DataType.DATE })
    declare updatedAt: CreationOptional<Date>;
}