import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import User from "../User";

/**
 * Category
 */
export default class Invoice extends Model<
    InferAttributes<
		Invoice
    >,
    InferCreationAttributes<
		Invoice,
        { omit: 'id' | 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
	declare total: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Create category model
 */
export function createInvoiceModel(
	conn: Sequelize,
	user: typeof User,
) {
    const TABLE_NAME = "invoice";
	
    const InvoiceModel = Invoice.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
		// Total price to pay
		total: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
    });
    
	InvoiceModel.belongsTo(user);
	
    return InvoiceModel;
}
