import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import User from "../User";
import Property from "./Property";

/**
 * Property comment
 */
export default class UserFavoriteProperty extends Model<
    InferAttributes<
        UserFavoriteProperty
    >,
    InferCreationAttributes<
        UserFavoriteProperty,
        { omit: 'id' | 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * User favorites
 */
export function createUserFavoriteProperty(conn: Sequelize, user: typeof User, property: typeof Property) {
    const TABLE_NAME = "user-favorite-property";
    
    const PropertyRatingModel = UserFavoriteProperty.init({
        id: { 
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
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
    
    return PropertyRatingModel;
}
