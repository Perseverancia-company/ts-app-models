import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";

import User from "../user/User";
import Category from "./Category";
import Price from "./Price";

/**
 * Property model
 * 
 * This model holds the property data.
 */
export default class Property extends Model<
    InferAttributes<
        Property
    >,
    InferCreationAttributes<
        Property,
        { omit: 'id' | 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
    
    declare uuid: string;
    declare title: string;
    declare description: string;
    declare rooms: number;
    declare parking: number;
    declare bathrooms: number;
    
    // TODO: These three could be put in another table
    // because there may be many apartments at the same direction for example, and also for cleanliness.
    declare street: string;
    declare latitude: string;
    declare longitude: string;
    
    // TODO: External attribute that should be on general property information too
    declare published: boolean;
    
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Property model
 * 
 * @param conn 
 * @returns 
 */
export function createPropertyModel(
    conn: Sequelize,
    user: typeof User,
    category: typeof Category,
    price: typeof Price
) {
    const TABLE_NAME = "property";
    
    const PropertyModel = Property.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rooms: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        parking: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bathrooms: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        street: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        latitude: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        published: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
    });
    
    // TODO: These three could be moved to general property information too
    // The problem is just that, it will break everything.
    PropertyModel.belongsTo(user);
    PropertyModel.belongsTo(category);
    PropertyModel.belongsTo(price);
    
    return PropertyModel;
}
