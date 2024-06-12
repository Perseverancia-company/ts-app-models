import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";

/**
 * User model
 */
export default class Category extends Model<
    InferAttributes<
        Category
    >,
    InferCreationAttributes<
        Category,
        { omit: 'id' | 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Initialize user model
 * 
 * @param conn 
 * @returns 
 */
export function createCategoryModel(conn: Sequelize) {
    const TABLE_NAME = "category";
        
    const Model = Category.init({
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
