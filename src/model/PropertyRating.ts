import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import User from "./User";
import Property from "./Property";

/**
 * Property comment
 */
export default class PropertyRating extends Model<
    InferAttributes<
        PropertyRating
    >,
    InferCreationAttributes<
        PropertyRating,
        { omit: 'id' | 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
    declare rating: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Property ratings
 * 
 * Most websites use a 0 to 5 stars rating, and it's a float, so we are going with that.
 * 
 * We keep track of the user, so that the user can't give more ratings to the same property.
 */
export function createPropertyRating(conn: Sequelize, user: typeof User, property: typeof Property) {
    const TABLE_NAME = "property-rating";
    
    const PropertyRatingModel = PropertyRating.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        rating: {
            type: DataTypes.FLOAT,
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
    PropertyRatingModel.belongsTo(property);
    PropertyRatingModel.belongsTo(user);
    
    // // Relations
    // PropertySellerMessageModel.belongsTo(this.property, {
    //     foreignKey: "propertyId",
    // });
    // PropertySellerMessageModel.belongsTo(this.user, {
    //     foreignKey: "userId",
    // });
    
    return PropertyRatingModel;
}
