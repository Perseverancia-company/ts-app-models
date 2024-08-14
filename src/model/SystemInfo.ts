import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import ServerNode from "./ServerNode";

/**
 * System info
 */
export default class SystemInfo extends Model<
    InferAttributes<
		SystemInfo
    >,
    InferCreationAttributes<
		SystemInfo,
        { omit: "id" }
    >> {
	declare id: number;
	declare name: string;
	declare kernelVersion: string;
	declare osVersion: string;
	declare hostname: string;
}

/**
 * System info
 */
export function createSystemInfoModel(
	conn: Sequelize
) {
	const TABLE_NAME = "system-info";
	const Model = SystemInfo.init({
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
		kernelVersion: {
			type: DataTypes.STRING(255),
		},
		osVersion: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		hostname: {
			type: DataTypes.STRING(255),
			allowNull: false,
		}
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
		timestamps: false
    });
	
	return Model;
}
