import { DataTypes } from "sequelize";

import mysqlConn from "../connection/mysqlConn";

/**
 * 
 * @deprecated Use 'Models' class instead, for reusing connections.
 */
function DebugPropertyImageUpload() {
    const model = mysqlConn().define("debug-property-image-upload", {
        // This is for every entry, I need a bigger set, which will be the whole course of actions
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // Action course uuid
        // (because configuring auto increment to act however I want, it's kinda hard)
        actionCourseUuid: {
            // String instead of uuid
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Actions stage
        // 1) Frontend validation
        // 2) Folder creation and validation
        // 3) Backend validation
        // 4) Endpoint finishing touches
        actionStage: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        // Action type
        // 'validate_image_size'
        action: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // Image information
        // Array is not available in MySQL
        imageNames: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        // State information
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // 1) Normal
        // 2) Success
        // 3) Warning
        // 4) Error
        // 5) Notification
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: "debug-property-image-upload",
    });
    
    return model;
}

export default DebugPropertyImageUpload;
