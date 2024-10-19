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
import UserRolesModels from "./test/modelSet/UserRolesModels";
import DefaultUsers from "./seed/DefaultUsers";

export {
	// Prefer to use this one
	mysqlConn,
	mysqlProductionConnection,
	
	isTesting,
	isDevelopment,
	
	// Seeding
	createAdminUser,
	createNormalUser,
	DefaultUsers,
	
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
	UserRolesModels,

	// Tables
	resetTables,
	TablesController,
	TablesGroupController,
};

export type { PartialConnectionOptions };
