import { Model } from 'sequelize';

export default class Tag extends Model {
    public id!: number;
    public postId!: number;
    public tagName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}