// Connections
import MSQLDC_FetchENV from "./connection/MSQLDC_FetchENV";
import mysqlConn from "./connection/mysqlConn";
import MySQLDatabaseConnection from "./connection/MySQLDatabaseConnection";

import printMysqlEnvironmentVariables from "./env/printMysqlEnvironmentVariables";

import {
    Category,
    DebugPropertyImageUpload,
    Price,
    Property,
    User,
    UserMessages,
} from "./models/SQL/runtime/index";
import MODEL from "./models/SQL/index";

export default {
    // Connectors
    // To connect to the database
    MSQLDC_FetchENV,
    mysqlConn,
    MySQLDatabaseConnection,
    
    // Debug
    printMysqlEnvironmentVariables,
    
    // Module level initialization
    MODEL,
    
    // Default exports
    Category,
    DebugPropertyImageUpload,
    Price,
    Property,
    User,
    UserMessages,
}
