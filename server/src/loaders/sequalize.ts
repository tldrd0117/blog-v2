import { Sequelize } from 'sequelize'
import { init } from '../models'
import Container from 'typedi'

export default async () => {
    try{
        const sequelize = new Sequelize({
            host: "database",
            dialect: "mariadb",
            database: "blog",
            username: "root",
            password: "qwer1234",
            port: 3306
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