import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table,} from 'sequelize-typescript';
import {BelongsToSetAssociationMixin} from "sequelize";
import {Role} from "./Role";
import {Product} from "./Product";

@Table({tableName: 'users'})
export class User extends Model {
    @Column({
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER
    })
    id!: number;

    @Column(DataType.STRING)
    username!: string;

    @Column(DataType.STRING)
    name!: string;

    @ForeignKey(() => Role)
    role_id!: number;

    @Column(DataType.STRING)
    phone!: string;

    @Column(DataType.STRING)
    password!: string;

    @Column(DataType.BOOLEAN)
    is_super_admin!: boolean;

    @BelongsTo(() => Role, {onDelete: "CASCADE", foreignKey: 'role_id'})
    declare role: Role

    declare setRole: BelongsToSetAssociationMixin<Role, Role['id']>

    @HasMany(() => Product, {foreignKey: 'user_id'})
    declare products: Product[];
}