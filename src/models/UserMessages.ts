import { DataTypes } from "sequelize";

import mysqlConn from "../connection/mysqlConn";
import User from "./User";

/**
 * 
 * @deprecated Use 'Models' class instead, for reusing connections.
 */
function UserMessages() {
    const model = mysqlConn().define("user-messages", {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: "user-messages",
    });
    
    model.belongsTo(User());
    
    return model;
}

export default UserMessages;
