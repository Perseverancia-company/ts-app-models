import os from "os";

import { Sequelize } from "sequelize";
import { developmentDatabaseName, productionDatabaseName } from "../env";

export interface PartialConnectionOptions {
    pool: {
        max: number,
        acquire: number,
        // Five seconds of idling
        idle: number,
    };
	databaseName?: string;
}

export const DEFAULT_POOL_OPTIONS = {
	// Per processor
	// Connections per processor is twice as many cpus
	max: os.cpus().length * 2,
	// Ten seconds
	acquire: 10 * 1000,
	// Five seconds of idling
	idle: 5 * 1000,
};

/**
 * Production connection
 * 
 * The only thing that changes is the database name
 */
export function mysqlProductionConnection() {
	return mysqlConn({
		pool: DEFAULT_POOL_OPTIONS,
		databaseName: productionDatabaseName(),
	});
}

/**
 * Initialize sequelize using environment variables
 * 
 * Had a lot of trouble with sequelize, because the environment variables were being
 * fetch very early, this is to fetch them a little later.
 * 
 * The options object is similar to the sequelize options
 */
export default function mysqlConn(options: PartialConnectionOptions = {
    pool: DEFAULT_POOL_OPTIONS,
}) {
    // Mysql information
    const databaseName = options.databaseName ?? developmentDatabaseName();
    const MYSQL_USERNAME = process.env.DATABASE_USERNAME ?? process.env.MYSQL_USERNAME ?? "root";
    const MYSQL_PASSWORD = process.env.DATABASE_PASSWORD ?? process.env.MYSQL_PASSWORD ?? "";
    const MYSQL_HOST = process.env.DATABASE_HOST ?? process.env.MYSQL_HOST ?? "localhost";
    
    // Get port
    let endPort: number = 3306;
    if(process.env.MYSQL_PORT) endPort = parseInt(process.env.MYSQL_PORT);
    const MYSQL_PORT = endPort;
    
    const mysqlConnection = new Sequelize(databaseName, MYSQL_USERNAME, MYSQL_PASSWORD, {
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
