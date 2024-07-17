import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";

/**
 * App
 */
export default class App extends Model<
    InferAttributes<
		App
    >,
    InferCreationAttributes<
		App,
        { omit: "path" | 'createdAt' | 'updatedAt' }
    >> {
	declare name: string;
	declare path: string;
	declare appType: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * App information
 */
export function createAppModel(
	conn: Sequelize
) {
	const TABLE_NAME = "app";
	
	const Model = App.init({
		// Name like 'authentication' or 'real-estate'
		// Indirect relation with 'process' table
		// TODO: Make process belong to this
		name: {
			type: DataTypes.STRING(128),
			allowNull: false,
			primaryKey: true,
		},
		// App path
		path: {
			type: DataTypes.STRING(2 ** 12),
		},
		// TODO: This has to be a table
		// App type
		// 1) application
		// Normal app, for end users
		// 2) server
		// A backend server
		// 3) frontend
		// A frontend server
		// 4) daemon
		appType: {
			type: DataTypes.STRING(64),
			allowNull: false,
			defaultValue: "server",
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
