import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";

/**
 * Process
 */
export default class Process extends Model<
    InferAttributes<
		Process
    >,
    InferCreationAttributes<
		Process,
        { omit: 'pid' | 'url' | 'createdAt' | 'updatedAt' }
    >> {
	declare name: string;
	declare pid: number;
	declare url: string;
	declare appType: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Process model
 * 
 * Store apps process informaiton
 * 
 * - Process are identified by a unique name
 * With this simple rule you can start the same app, for example,
 * with different arguments and it will still work if you provide a different name
 */
export function createProcessModel(
	conn: Sequelize
) {
	const TABLE_NAME = "process";
	const Model = Process.init({
		// Name like 'authentication' or 'real-estate'
		name: {
			type: DataTypes.STRING(128),
			allowNull: false,
			primaryKey: true,
		},
		pid: {
			type: DataTypes.INTEGER,
			// We need to allow null, this will indicate that the process is not running
			allowNull: true,
		},
		// URL if it's a server
		url: {
			type: DataTypes.STRING(256),
		},
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
