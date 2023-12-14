import { DataSource } from "typeorm";

const connectDB =  new DataSource({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    database: "chat",
    logging: false,
    synchronize: true,
    entities: ["./src/entity/*.js"],

})

export default connectDB;