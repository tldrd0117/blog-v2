import { Model, Association, DataTypes, Sequelize } from 'sequelize';
import Post from './post'

export default class Tag extends Model {
    public id!: number;
    public postId!: number;
    public tagName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}


export const initModel = (sequelize: Sequelize) => {
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
            allowNull: false,
            
        }
    },{
        sequelize,
        tableName: "tags",
        engine: "Mroonga",
        comment: 'engine "InnoDB"',
        charset: "utf8",
        indexes: [
            {
                fields: ["id"]
            }
        ],
    });
        
}

export const initRelation = () => {
    Tag.belongsTo(Post, {
        targetKey: 'id',
        foreignKey: 'postId'
    });
}
