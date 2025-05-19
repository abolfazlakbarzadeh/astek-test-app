import {
    Table,
    Column,
    Model,
    DataType,
} from 'sequelize-typescript';

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
    permissions!: string;
}