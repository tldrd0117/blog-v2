import { Sequelize } from 'sequelize'
import modelInit from '../models'

export default async () => {
    const sequelize = new Sequelize({
        dialect: "mariadb",
        database: "blog",
        username: "root",
        password: "qwer1234"
    })
    try{
        await sequelize.authenticate();
        modelInit(sequelize);
        console.log('Connection has been established successfully.');
    } catch(err) {
        console.error('Unable to connect to the database:', err);
    }
}