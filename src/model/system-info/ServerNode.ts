import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import ServerLocation from "./ServerLocation";
import SystemInfo from "./SystemInfo";
import SystemResources from "./SystemResources";

export type ServerStatus = "Online" | "Offline" | "Maintenance";

/**
 * Server node
 */
export default class ServerNode extends Model<
    InferAttributes<
		ServerNode
    >,
    InferCreationAttributes<
		ServerNode,
        { omit: "id" | "createdAt" | "updatedAt" }
    >> {
	declare id: number;
	declare status: ServerStatus;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Server node
 */
export function createServerNodeModel(
	conn: Sequelize,
	serverLocation: typeof ServerLocation,
	systemInfo: typeof SystemInfo,
	systemResources: typeof SystemResources,
) {
	const TABLE_NAME = "server-node";
	const Model = ServerNode.init({
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		status: {
			type: DataTypes.ENUM('Online', 'Offline', 'Maintenance'),
			defaultValue: 'Offline'
		},
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
    });
	
	Model.belongsTo(serverLocation);
	Model.belongsTo(systemInfo);
	Model.belongsTo(systemResources);
	
	return Model;
}
