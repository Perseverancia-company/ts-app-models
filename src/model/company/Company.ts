import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import Address from "../Address";

/**
 * Company
 */
export default class Company extends Model<
    InferAttributes<
		Company
    >,
    InferCreationAttributes<
		Company,
        { omit: 'id' | "description" | 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
    declare name: string;
	declare description: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Create company model
 */
export function createCompanyModel(
	conn: Sequelize,
	address: typeof Address
) {
    const TABLE_NAME = "company";
        
    const Model = Company.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
		// Optional company description
		description: {
			type: DataTypes.TEXT
		},
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
    });
    
	Model.belongsTo(address);
	
    return Model;
}
