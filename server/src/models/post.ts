import { Model, Association } from 'sequelize';
import Tag from './tag';
import Comment from './comment';

export default class Post extends Model {
    public id!: number;
    public authorId!: string;
    public title!: string;
    public content!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly tags?: Tag[];
    public readonly comments?: Comment[];

    public static associations: {
        tags: Association<Post, Tag>;
        comments: Association<Post, Comment>;
    }
}