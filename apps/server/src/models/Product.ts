import {BelongsTo, Column, DataType, ForeignKey, Model, Table,} from 'sequelize-typescript';
import {User} from "./User";

@Table({tableName: 'products'})
export class Product extends Model {
    @Column({
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER
    })
    id!: number;

    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.STRING)
    description!: string;

    @Column(DataType.INTEGER)
    price!: number;

    @ForeignKey(() => User)
    user_id!: number;

    @BelongsTo(() => User)
    declare user: User;
}