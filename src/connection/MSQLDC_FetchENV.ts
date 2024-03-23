import os from "os";

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

import PartialConnectionOptions from "../types/sequelize/PartialConnectionOptions";

// Setup dotenv
dotenv.config({
    path: ".env"
});

/**
 * Initialize sequelize using environment variables
 * 
 * Had a lot of trouble with sequelize, because the environment variables were being
 * fetch very early, this is to fetch them a little later.
 * 
 * @param options 
 * @deprecated Use 'mysqlConn'.
 */
export default function MSQLDC_FetchENV(options: PartialConnectionOptions = {
    pool: {
        // Per processor
        max: os.cpus().length * 2,
        acquire: 10 * 1000,
        idle: 5 * 1000,
    }
}) {
    // Mysql information
    const MYSQL_NAME = process.env.DATABASE_NAME ?? process.env.MYSQL_DATABASE_NAME ?? "good-roots";
    const MYSQL_USERNAME = process.env.DATABASE_USERNAME ?? process.env.MYSQL_USERNAME ?? "root";
    const MYSQL_PASSWORD = process.env.DATABASE_PASSWORD ?? process.env.MYSQL_PASSWORD ?? "";
    const MYSQL_HOST = process.env.DATABASE_HOST ?? process.env.MYSQL_HOST ?? "localhost";
    
    // Get port
    let endPort: number = 3306;
    if(process.env.MYSQL_PORT) endPort = parseInt(process.env.MYSQL_PORT);
    const MYSQL_PORT = endPort;
    
    const mysqlConnection = new Sequelize(MYSQL_NAME, MYSQL_USERNAME, MYSQL_PASSWORD, {
        host: MYSQL_HOST,
        port: MYSQL_PORT,
        dialect: "mysql",
        define: {
            timestamps: true,
        },
        pool: {
            ...options.pool
        },
        // This one seems to not exist on ts
        // operatorAliases: false,
        // Disable logging
        logging: false
    });
    
    return mysqlConnection;
}
