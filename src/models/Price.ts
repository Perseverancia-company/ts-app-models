import { DataTypes } from "sequelize";

import mysqlConn from "../connection/mysqlConn";

/**
 * 
 * @deprecated Use 'Models' class instead, for reusing connections.
 */
function Price() {
    // This creates a new connection each time, we have to take a reference
    const Model = mysqlConn().define("price", {
        id:{
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        }
    }, {
        tableName: "price",
    });
    
    return Model;
}

export default Price;
