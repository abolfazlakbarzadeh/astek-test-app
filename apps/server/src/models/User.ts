import {
    Table,
    Column,
    Model,
    DataType,
} from 'sequelize-typescript';

@Table({ tableName: 'Users' })
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

    @Column(DataType.STRING)
    phone!: string;

    @Column(DataType.STRING)
    password!: string;

    @Column(DataType.BOOLEAN)
    is_super_admin!: boolean;
}