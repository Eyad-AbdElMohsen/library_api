import { CreationOptional, Op, Sequelize, where } from "sequelize";
import { Table, Model, Column, DataType, AfterDestroy } from "sequelize-typescript";
import { BookStats } from "./book-stats.model";


@Table
export class User extends Model {
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    declare id: CreationOptional<number>

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.DATE })
    declare createdAt: CreationOptional<Date>;

    @Column({ type: DataType.DATE })
    declare updatedAt: CreationOptional<Date>;
}