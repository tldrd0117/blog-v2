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
                timeout: 120000
            }
            
        })
        Container.set("sequelize", sequelize)
        await sequelize.authenticate();
        init(sequelize);
        await sequelize.sync();
        //fulltext
        sequelize.query(`CREATE FULLTEXT INDEX IF NOT EXISTS tagName ON tags(tagName)`);
        sequelize.query(`CREATE FULLTEXT INDEX IF NOT EXISTS title ON posts(title)`);
        sequelize.query(`CREATE FULLTEXT INDEX IF NOT EXISTS content ON posts(content)`);
        
        console.log('Connection has been established successfully.');
    } catch(err) {
        console.error('Unable to connect to the database:', err);
    }
}