import { Model, Association, DataTypes, Sequelize } from 'sequelize';
import Post from './post'
import User from './user'

export default class Comment extends Model {
    public id!: number;
    public postId!: string;
    public authorId!: number;
    public content!: string;
    public depth!: number;
    public parentId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly comments?: Comment[];
    public readonly user?: User;

    public static associations: {
        comments: Association<Comment, Comment>;
    }
}

export const initModel = (sequelize: Sequelize) => {
    Comment.init({
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        postId:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        authorId:{
            type: DataTypes.INTEGER.UNSIGNED,
        },
        content:{
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        depth:{
            type: DataTypes.INTEGER.UNSIGNED
        },
        parentId:{
            type: DataTypes.INTEGER.UNSIGNED
        }
    },{
        sequelize,
        tableName: "comments",
        engine: "InnoDB",
        charset: "utf8",
        indexes: [
            {
                fields: ["id"]
            }
        ],
    });
}

export const initRelation = () => {
    Comment.belongsTo(Post, {
        targetKey: 'id',
        foreignKey: 'postId'
    });

    Comment.belongsTo(User, {
        targetKey: 'id',
        foreignKey: 'authorId',
        as: 'user'
    });

    Comment.belongsTo(Comment, {
        targetKey: 'parentId',
        foreignKey: 'id',
    })
    Comment.hasMany(Comment, {
        sourceKey: 'id',
        foreignKey: 'parentId',
        as: 'comments'
    });
}
