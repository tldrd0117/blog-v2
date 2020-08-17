import dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    jwtSecret: process.env.JWT_SECRET as string,
    host: process.env.host as string,
    dialect: process.env.dialect as string,
    database: process.env.database as string,
    username: process.env.username as string,
    password: process.env.password as string,
    port: process.env.port as string

}
