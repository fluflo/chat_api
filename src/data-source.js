"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var connectDB = new typeorm_1.DataSource({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    database: "chat",
    logging: false,
    synchronize: true,
    entities: ["./src/entity/*.js"],
});
exports.default = connectDB;
