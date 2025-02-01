import {
	Model,
	InferCreationAttributes,
	InferAttributes,
	Sequelize,
	DataTypes,
} from "sequelize";

import App from "../app/App";

/**
 * AppConfig
 */
export default class AppConfig extends Model<
	InferAttributes<AppConfig>,
	InferCreationAttributes<AppConfig>
> {
	declare appName: string;
	declare configKey: string;
	declare configValue: string;
	declare type: string;
	declare description?: string;
	declare updatedBy: string;
}

/**
 * AppConfig
 */
export function createAppConfigModel(conn: Sequelize, appModel: typeof App) {
	const TABLE_NAME = "app-config";
	const AppConfigModel = AppConfig.init(
		{
			appName: {
				type: DataTypes.STRING,
				allowNull: false,
				primaryKey: true,
				validate: {
					notEmpty: {
						msg: "Application name is required",
					},
				},
				references: {
					model: appModel,
					key: "name",
				},
			},
			configKey: {
				type: DataTypes.STRING,
				allowNull: false,
				primaryKey: true,
				validate: {
					notEmpty: {
						msg: "Configuration key is required",
					},
				},
			},
			configValue: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			type: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Type is required",
					},
				},
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			updatedBy: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Updated by is required",
					},
				},
			},
		},
		{
			timestamps: false, // <-- If this thing is missing, there are untraceable errors thrown when trying to use the model
			sequelize: conn,
			tableName: TABLE_NAME,
			modelName: TABLE_NAME,
		}
	);

	AppConfigModel.belongsTo(appModel, {
		foreignKey: "appName",
		targetKey: "name",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});

	return AppConfigModel;
}
