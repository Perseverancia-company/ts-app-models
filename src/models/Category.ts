import { DataTypes } from "sequelize";

import mysqlConn from "../connection/mysqlConn";

/**
 * Runtime definition
 * 
 * @returns 
 */
function Category() {
    const Model = mysqlConn().define("category", {
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
        tableName: "category",
    });
    
    return Model;
}

export default Category;
