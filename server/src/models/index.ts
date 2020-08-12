import { DataTypes, Sequelize } from 'sequelize'
import { Container } from "typedi";

class Models{
    Post=import("./post")
    PostTag=import("./postTag")
    User=import("./user")
    Comment=import("./comment")
    Tag=import("./tag")
}

export const models = new Models()

export const init = async (sequelize : Sequelize) => {
    for(const key in models){
        const { initModel } = await models[key]
        initModel(sequelize)
        Container.set(key, models[key])
    }
    for(const key in models){
        const { initRelation } = await models[key]
        initRelation()
    }
}




