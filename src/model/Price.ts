import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";

/**
 * User model
 */
export default class Price extends Model<
    InferAttributes<
        Price
    >,
    InferCreationAttributes<
        Price,
        { omit: 'id' | 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Create price model
 * 
 * @param conn 
 * @returns 
 */
export function createPriceModel(conn: Sequelize) {
    const TABLE_NAME = "price";
        
    const Model = Price.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
    });
    
    return Model;
}
