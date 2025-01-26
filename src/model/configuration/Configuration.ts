import {
	Model,
	InferCreationAttributes,
	InferAttributes,
	Sequelize,
	DataTypes,
} from "sequelize";

/**
 * Configuration
 */
export default class Configuration extends Model<
	InferAttributes<Configuration>,
	InferCreationAttributes<Configuration>
> {
	declare key: string;
	declare value: string;
}

/**
 * General Configuration model, mainly for applications that need to know some configuration parts
 */
export function createConfigurationModel(conn: Sequelize) {
	const TABLE_NAME = "configuration";
	const ConfigurationModel = Configuration.init(
		{
			key: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Key is required",
					},
				},
			},
			value: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Value is required",
					},
				},
			}
		},
		{
			sequelize: conn,
			tableName: TABLE_NAME,
			modelName: TABLE_NAME,
		}
	);

	return ConfigurationModel;
}
