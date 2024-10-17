// Connections
import { mysqlProductionConnection } from "./connection/mysqlConn";
import mysqlConn from "./connection/mysqlConn";
import printMysqlEnvironmentVariables from "./env/printMysqlEnvironmentVariables";
import { resetTables } from "./cmd/tables";
import Models from "./Models";
import { PartialConnectionOptions } from "./connection/mysqlConn";
import TablesController from "./lib/TablesController";
import TablesGroupController from "./lib/TablesGroupController";
import databaseName, {
	defaultDatabaseName,
	developmentDatabaseName,
	testingDatabaseName,
	productionDatabaseName,
	initializeDotenv,
	isTesting,
	isDevelopment,
} from "./env";
import {
	createAdminUser,
	createNormalUser,
} from "./seed";

export {
	// Prefer to use this one
	mysqlConn,
	mysqlProductionConnection,
	
	isTesting,
	isDevelopment,
	
	// Seeding
	createAdminUser,
	createNormalUser,
	
	// Debug
	printMysqlEnvironmentVariables,

	// Environment
	initializeDotenv,
	developmentDatabaseName,
	testingDatabaseName,
	productionDatabaseName,
	defaultDatabaseName,
	databaseName,

	// Models
	Models,

	// Tables
	resetTables,
	TablesController,
	TablesGroupController,
};

export type { PartialConnectionOptions };
