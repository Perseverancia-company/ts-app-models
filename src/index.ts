// Connections
import { mysqlProductionConnection } from "./connection/mysqlConn";
import mysqlConn from "./connection/mysqlConn";
import printMysqlEnvironmentVariables from "./env/printMysqlEnvironmentVariables";
import { resetTables } from "./cmd/tables";
import Models from "./Models";
import { PartialConnectionOptions } from "./connection/mysqlConn";
import TablesController from "./lib/TablesController";
import TablesGroupController from "./lib/TablesGroupController";

import { databaseName, nodeEnvDatabaseName, developmentDatabaseName, testingDatabaseName, productionDatabaseName } from "./env";

export {
    // Prefer to use this one
    mysqlConn,
	mysqlProductionConnection,
    
    // Debug
    printMysqlEnvironmentVariables,
	
	// Environment
	developmentDatabaseName,
	testingDatabaseName,
	productionDatabaseName,
	databaseName,
	nodeEnvDatabaseName,
    
    // Models
    Models,
    
    // Tables
    resetTables,
    TablesController,
	TablesGroupController,
}

export type {
    PartialConnectionOptions
}
