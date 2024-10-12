import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import App from "./App";

/**
 * AppOutput
 */
export default class AppOutput extends Model<
    InferAttributes<
		AppOutput
    >,
    InferCreationAttributes<
		AppOutput,
        { omit: 'id' | 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
    declare appName: string;
	declare output: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * App output
 */
export function createAppOutputModel(
	conn: Sequelize,
	app: typeof App
) {
	const TABLE_NAME = "app-output";
	const Model = AppOutput.init({
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.BIGINT,
		},
		appName: { 
			allowNull: false,
			type: DataTypes.STRING(128),
			references: {
				model: app,
				key: 'name'
			}
		},
		output: { 
			type: DataTypes.TEXT,
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
