// Connections
import MSQLDC_FetchENV from "./connection/MSQLDC_FetchENV";
import mysqlConn from "./connection/mysqlConn";
import MySQLDatabaseConnection from "./connection/MySQLDatabaseConnection";

import printMysqlEnvironmentVariables from "./env/printMysqlEnvironmentVariables";

import MODEL from "./models/index";

export default {
    // Connectors
    // To connect to the database
    MSQLDC_FetchENV,
    mysqlConn,
    MySQLDatabaseConnection,
    
    // Debug
    printMysqlEnvironmentVariables,
    
    // Default exports
    MODEL
}
