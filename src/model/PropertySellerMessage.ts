import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import User from "./User";
import Property from "./Property";

/**
 * Property seller message
 */
export default class PropertySellerMessage extends Model<
    InferAttributes<
        PropertySellerMessage
    >,
    InferCreationAttributes<
        PropertySellerMessage,
        { omit: 'id' | 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
    declare message: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Messages sent to a property seller
 * 
 * The difference between messages and comments is that messages are private, between the user and property owner.
 */
export function createPropertySellerMessage(conn: Sequelize, user: typeof User, property: typeof Property) {
    const TABLE_NAME = "property-seller-message";
        
    const PropertySellerMessageModel = PropertySellerMessage.init({
        id: { 
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        message: {
            type: DataTypes.STRING(512),
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
    });
    
    // Relations
    PropertySellerMessageModel.belongsTo(property);
    PropertySellerMessageModel.belongsTo(user);
    
    // // Relations
    // PropertySellerMessageModel.belongsTo(this.property, {
    //     foreignKey: "propertyId",
    // });
    // PropertySellerMessageModel.belongsTo(this.user, {
    //     foreignKey: "userId",
    // });
    
    return PropertySellerMessageModel;
}
