import { Sequelize } from 'sequelize'
import { init } from '../models'
import Container from 'typedi'

export default async () => {
    const sequelize = new Sequelize({
        host: "database",
        dialect: "mariadb",
        database: "blog",
        username: "root",
        password: "qwer1234",
        port: 3306
    })
    Container.set("Sequelize", sequelize);
    try{
        await sequelize.authenticate();
        init(sequelize);
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch(err) {
        console.error('Unable to connect to the database:', err);
    }
}