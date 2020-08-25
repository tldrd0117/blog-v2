import { Sequelize, Dialect } from 'sequelize'
import { init } from '../models'
import Container from 'typedi'
import config from '../config'

export default async () => {
    try{
        const sequelize = new Sequelize({
            host: config.host,
            dialect: config.dialect as Dialect,
            database: config.database,
            username: config.username,
            password: config.password,
            port: Number(config.port),
            dialectOptions: {
            }
        })
        Container.set("sequelize", sequelize)
        await sequelize.authenticate();
        init(sequelize);
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch(err) {
        console.error('Unable to connect to the database:', err);
    }
}