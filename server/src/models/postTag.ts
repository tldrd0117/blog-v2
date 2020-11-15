import { Model, Association, DataTypes, Sequelize } from 'sequelize';
import Post from './post';
import Tag from './tag';

export default class PostTag extends Model {
    public tagId!: number;
    public postId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const initModel = (sequelize: Sequelize) => {
    PostTag.init({
        tagId:{
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false
        },
        postId:{
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false
        }
    },{
        sequelize,
        tableName: "postTags",
        engine: "Mroonga",
        comment: 'engine "InnoDB"',
        charset: "utf8",
        indexes: [
            {
                fields: ["tagId", "postId"]
            }
        ],
    });
        
}

export const initRelation = () => {
    // PostTag.belongsTo(Post, {
    //     targetKey: 'id',
    //     foreignKey: 'postId'
    // });
    // PostTag.belongsTo(Tag, {
    //     targetKey: 'id',
    //     foreignKey: 'tagId'
    // })
}
