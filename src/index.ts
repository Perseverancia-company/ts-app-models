// Connections
import MSQLDC_FetchENV from "./connection/MSQLDC_FetchENV";
import mysqlConn from "./connection/mysqlConn";
import MySQLDatabaseConnection from "./connection/MySQLDatabaseConnection";

import printMysqlEnvironmentVariables from "./env/printMysqlEnvironmentVariables";

import TablesController, { resetTables } from "./cmd/tables";

import MODEL from "./models/index";

export default {
    // Connectors
    // To connect to the database
    // For compatibility
    MSQLDC_FetchENV,
    MySQLDatabaseConnection,
    // Prefer to use this one
    mysqlConn,
    
    // Debug
    printMysqlEnvironmentVariables,
    
    MODEL,
    
    // Tables
    resetTables,
    TablesController
}
