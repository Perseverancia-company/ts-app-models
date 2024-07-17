import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";

/**
 * Address
 */
export default class Address extends Model<
    InferAttributes<
		Address
    >,
    InferCreationAttributes<
		Address,
        { omit: 'id' | "postal" | 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
	declare street: string;
	declare city: string;
	declare state: string;
	declare country: string;
	declare latitude: number;
	declare longitude: number;
	declare postal: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Address
 */
export function createAddressModel(conn: Sequelize) {
	const TABLE_NAME = "address";
	const AddressModel = Address.init({
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		street: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Street is required"
				}
			}
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "City is required",
				}
			}
		},
		state: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "State is required",
				}
			}
		},
		country: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Country is required",
				}
			}
		},
		latitude: {
			type: DataTypes.DOUBLE
		},
		longitude: {
			type: DataTypes.DOUBLE,
		},
		postal: {
			type: DataTypes.STRING,
		},
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
    });
	
	return AddressModel;
}
