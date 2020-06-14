import dotenv from 'dotenv'

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    jwtSecret: process.env.JWT_SECRET as string,
    host: process.env.host,
    dialect: process.env.dialect,
    database: process.env.database,
    username: process.env.username,
    password: process.env.password,
    port: process.env.port

}
