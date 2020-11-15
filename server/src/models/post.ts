import { Model, Association, DataTypes, Sequelize } from 'sequelize';
import PostTag from './postTag';
import Comment from './comment';
import User from './user'
import Tag from './tag';

export default class Post extends Model {
    public id!: number;
    public authorId!: number;
    public title!: string;
    public content!: string;
    public view!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly tags?: Tag[];
    public readonly comments?: Comment[];
    public readonly user?: User;

    public static associations: {
        tags: Association<Post, Tag>;
        comments: Association<Post, Comment>;
    }
}

export const initModel = (sequelize: Sequelize) => {
    Post.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        authorId:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        title:{
            type: DataTypes.STRING(200),
            allowNull: false
        },
        content:{
            type: DataTypes.TEXT,
            allowNull: false
        },
        view:{
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        }
    },{
        sequelize,
        tableName: "posts",
        engine: "Mroonga",
        charset: "utf8",
        comment: 'engine "InnoDB"',
        indexes: [
            {
                fields: ["id"]
            },
        ],
    });

}

export const initRelation = () => {

    Post.belongsToMany(Tag, {
        through: PostTag,
        foreignKey: 'postId',
        otherKey: 'tagId',
        as: 'tags'
    });

    Post.hasMany(Comment, {
        sourceKey: 'id',
        foreignKey: 'postId',
        as: 'comments'
    });

    Post.belongsTo(User, {
        targetKey: 'id',
        foreignKey: 'authorId',
        as: 'user'
    });
}
