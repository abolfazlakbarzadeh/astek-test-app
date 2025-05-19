import {
    Table,
    Column,
    Model,
    DataType, BelongsTo, BelongsToMany, HasMany,
} from 'sequelize-typescript';
import {User} from "./User";

@Table({ tableName: 'roles' })
export class Role extends Model {
    @Column({
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER
    })
    id!: number;

    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.JSON)
    permissions!: string[];

    @HasMany(() => User, { foreignKey: 'role_id' })
    declare users: User[];
}