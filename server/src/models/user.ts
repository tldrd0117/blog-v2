import { Model } from 'sequelize';

export default class User extends Model {
    public id!: number;
    public email!: string;
    public username!: string;
    public password!: string;
    public role!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}
  
