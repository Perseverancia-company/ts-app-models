import { DataTypes } from "sequelize";

import mysqlConn from "../connection/mysqlConn";

function Price() {
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
