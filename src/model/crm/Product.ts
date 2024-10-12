import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";

/**
 * Product
 */
export default class Product extends Model<
    InferAttributes<
        Product
    >,
    InferCreationAttributes<
        Product,
        { omit: 'id' | 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
    declare name: string;
	declare price: number;
	declare image: string;
	declare stock: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Product model
 */
export function createProductModel(conn: Sequelize) {
    const TABLE_NAME = "product";
        
    const Model = Product.init({
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
		price: {
			type: DataTypes.INTEGER,
		},
		// Like user pfp the image is just the name of the file
		image: {
			type: DataTypes.STRING(64),
		},
		stock: {
			type: DataTypes.INTEGER,
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
