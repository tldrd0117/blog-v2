import { Model } from 'sequelize';

export default class Post extends Model {
    public id!: number;
    public authorId!: string;
    public title!: string;
    public content!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}