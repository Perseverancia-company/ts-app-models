import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";

import PropertySellerMessage from "./PropertySellerMessage";
import PropertyRating from "./PropertyRating";
import PropertyComment from "./PropertyComment";
import Property from "./Property";
/**
 * User model
 */
export default class GeneralPropertyInformation extends Model<
    InferAttributes<
        GeneralPropertyInformation
    >,
    InferCreationAttributes<
        GeneralPropertyInformation,
        { omit: 'id' | 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
    
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * General property information
 * 
 * @param conn 
 * @returns 
 */
export function createGeneralPropertyInformationModel(
    conn: Sequelize,
    property: typeof Property,
    propertySellerMessage: typeof PropertySellerMessage,
    propertyRating: typeof PropertyRating,
    propertyComment: typeof PropertyComment
) {
    const TABLE_NAME = "general-property-information";
    
    const PropertyModel = GeneralPropertyInformation.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
    });
    
    // Owns many messages
    PropertyModel.belongsTo(property);
    
    // Before dependencies we've got to create the table
    PropertyModel.sync();
    
    // Junctions are for many to many relationships
    PropertyModel.hasMany(propertySellerMessage);
    PropertyModel.hasMany(propertyRating);
    PropertyModel.hasMany(propertyComment);
    
    return PropertyModel;
}
