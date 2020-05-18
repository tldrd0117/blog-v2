import User from './user'
import { DataTypes, Sequelize } from 'sequelize/types'
import bcrypt from "bcrypt-nodejs"
import Post from './post';

export default function init(sequelize : Sequelize) {
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
            type: new DataTypes.STRING(15),
            allowNull: false
        },
        salt:{
            type: new DataTypes.STRING(30),
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
        ],
        hooks: {
            beforeCreate: (user) =>{
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt)
                user.salt = salt
            }
        }
    });

    // Post.init({

    // })
}




