import { DataTypes, Sequelize } from 'sequelize'
import { Container } from "typedi";

class Models{
    Post=import("./post")
    Tag=import("./tag")
    User=import("./user")
    Comment=import("./comment")
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




