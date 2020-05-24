import { Sequelize } from 'sequelize'
import { init } from '../models'

export default async () => {
    const sequelize = new Sequelize({
        host: "database",
        dialect: "mariadb",
        database: "blog",
        username: "root",
        password: "qwer1234",
        port: 3306
    })
    try{
        await sequelize.authenticate();
        init(sequelize);
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch(err) {
        console.error('Unable to connect to the database:', err);
    }
}