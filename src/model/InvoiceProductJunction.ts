import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import Invoice from "./Invoice";
import Product from "./Product";

/**
 * Meeti participants
 */
export default class InvoiceProductJunction extends Model<
    InferAttributes<
		InvoiceProductJunction
    >,
    InferCreationAttributes<
		InvoiceProductJunction,
        { omit: 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Meeti assistants
 */
export function createInvoiceProductJunctionModel(
	conn: Sequelize,
	invoice: typeof Invoice,
	product: typeof Product,
) {
	const TABLE_NAME = "invoice-product-junction";
	const Model = InvoiceProductJunction.init({
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME
	});
	
	// M:N Relation of invoice / products
	invoice.belongsToMany(product, { through: Model });
	product.belongsToMany(invoice, { through: Model });
	
	return Model;
}
