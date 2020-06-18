import { Model } from 'sequelize';

export default class Comment extends Model {
    public id!: number;
    public postId!: string;
    public authorId!: string;
    public content!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    
}