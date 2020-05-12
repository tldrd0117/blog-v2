import { Model } from 'sequelize';
import bcrypt from 'bcrypt-nodejs';

export default class User extends Model {
    public id!: string;
    public email!: string;
    public password!: string;

    validPassword(password: string) {
        return bcrypt.compareSync(password, this.password);
    }
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
  
