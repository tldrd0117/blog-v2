import { Model, DataTypes, Sequelize, Association } from 'sequelize';
import Post from './post'
import Comment from './comment'

export default class User extends Model {
    public id!: number;
    public email!: string;
    public username!: string;
    public password!: string;
    public role!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    
}

export const initModel = (sequelize: Sequelize) => {
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
            type: DataTypes.STRING(100),
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
    
}

export const initRelation = () => {
    User.hasMany(Post, {
        sourceKey: 'id',
        foreignKey: 'authorId',
        as: 'posts'
    });
    User.hasMany(Comment, {
        sourceKey:"id",
        foreignKey: "authorId",
        as: 'comments'
    });
}

