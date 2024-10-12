import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";

/**
 * Server location
 */
export default class ServerLocation extends Model<
    InferAttributes<
		ServerLocation
    >,
    InferCreationAttributes<
		ServerLocation,
        { omit: "id" }
    >> {
	declare id: number;
	// Display name
	declare name: string;
	declare domain: string;
	// Ip and port
	declare address: string;
	declare port: string;
}

/**
 * Server location
 */
export function createServerLocation(
	conn: Sequelize
) {
	const TABLE_NAME = "server-location";
	const Model = ServerLocation.init({
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		// You must guarantee that either the domain name or the address + port is provided
		domain: {
			type: DataTypes.TEXT,
		},
		address: {
			type: DataTypes.TEXT,
		},
		port: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
		timestamps: false
    });
	
	return Model;
}
