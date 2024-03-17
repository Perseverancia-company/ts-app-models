import { DataTypes } from "sequelize";

import MSQLDC_FetchENV from "../../connection/MSQLDC_FetchENV";

const DebugPropertyImageUpload = MSQLDC_FetchENV().define("debug-property-image-upload", {
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

export default DebugPropertyImageUpload;
