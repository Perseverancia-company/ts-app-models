import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import Property from "./Property";

/**
 * 
 */
export default class DebugPropertyImageUpload extends Model<
    InferAttributes<
        DebugPropertyImageUpload
    >,
    InferCreationAttributes<
        DebugPropertyImageUpload,
        { omit: 'id' | 'action' | 'imageNames' | 'title' | 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
    
    declare actionCourseUuid: string;
    declare actionStage: number;
    declare action: string;
    declare imageNames: string[];
    declare title: string;
    declare message: string;
    declare status: number;
    
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Debug property image upload
 */
export function createDebugPropertyImageUpload(conn: Sequelize, property: typeof Property) {
    const TABLE_NAME = "debug-property-image-upload";
        
    const DebugPropertyImageUploadModel = DebugPropertyImageUpload.init({
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
        },
        // Image information
        // Array is not available in MySQL
        imageNames: {
            type: DataTypes.JSON,
        },
        // State information
        title: {
            type: DataTypes.STRING,
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
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
    });
    
    DebugPropertyImageUploadModel.belongsTo(Property);
    
    return DebugPropertyImageUploadModel;
}
