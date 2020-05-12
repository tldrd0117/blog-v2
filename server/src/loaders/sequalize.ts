import { Sequelize } from 'sequelize'

export default async () => {
    const sequelize = new Sequelize({
        dialect: "mariadb",
        database: "blog",
        username: "root",
        password: "qwer1234"
    })
    await sequelize.authenticate()
}