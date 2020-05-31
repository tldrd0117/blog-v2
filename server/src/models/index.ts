import User from './user'
import { DataTypes, Sequelize } from 'sequelize'
import bcrypt from "bcrypt-nodejs"
import Post from './post';
import Tag from './tag';
import Comment from './comment';

export const models = {
    User, Post, Tag, Comment
}

export const init = (sequelize : Sequelize) => {
    User.init({
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false
        },
        username:{
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING(20),
            allowNull: false
        },
        role:{
            type: DataTypes.STRING(20),
            allowNull: false
        }
    },{
        sequelize,
        tableName: "users",
        engine: "InnoDB",
        charset: "utf8",
        indexes: [
            {
                fields: ["email"]
            }
        ]
    });

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
        }
    },{
        sequelize,
        tableName: "posts",
        engine: "InnoDB",
        charset: "utf8",
        indexes: [
            {
                fields: ["id"]
            }
        ],
    });

    Tag.init({
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
        tagName:{
            type: DataTypes.STRING(200),
            allowNull: false
        }
    },{
        sequelize,
        tableName: "tags",
        engine: "InnoDB",
        charset: "utf8",
        indexes: [
            {
                fields: ["id"]
            }
        ],
    });

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
        content:{
            type: DataTypes.STRING(200),
            allowNull: false
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
    Post.hasMany(Tag, {
        sourceKey: 'id',
        foreignKey: 'postId',
        as: 'tags'
    });
    Tag.belongsTo(Post, {
        targetKey: 'id',
        foreignKey: 'postId'
    });
    Post.hasMany(Comment, {
        sourceKey: 'id',
        foreignKey: 'postId',
        as: 'comments'
    });
    Comment.belongsTo(Post, {
        targetKey: 'id',
        foreignKey: 'postId'
    });
    User.hasMany(Post, {
        sourceKey: 'id',
        foreignKey: 'authorId',
        as: 'posts'
    });
    Post.belongsTo(User, {
        targetKey: 'id',
        foreignKey: 'authorId',
    });
}




