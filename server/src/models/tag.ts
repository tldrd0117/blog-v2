import { Model, Association, DataTypes, Sequelize } from 'sequelize';
import Post from './post'
import PostTag from './postTag';

export default class Tag extends Model {
    public id!: number;
    public tagName!: string;
    public viewCount!: number;
    public searchCount!: number;
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
        tagName:{
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        viewCount:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        searchCount:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
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
    Tag.belongsToMany(Post, {
        through: PostTag,
        foreignKey: 'tagId',
        otherKey: 'postId'
    })
    // Tag.hasMany(PostTag, {
    //     sourceKey: 'id',
    //     foreignKey: 'tagId',
    //     as: 'postTags'
    // });
}
