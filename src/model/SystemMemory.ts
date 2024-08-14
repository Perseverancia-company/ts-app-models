import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import SystemResources from "./SystemResources";

/**
 * System memory
 */
export default class SystemMemory extends Model<
    InferAttributes<
		SystemMemory
    >,
    InferCreationAttributes<
		SystemMemory,
        { omit: 'id' }
    >> {
    declare id: number;
	
	declare total: number;
	declare used: number;
	declare free: number;
}

/**
 * System memory
 */
export function createSystemMemoryModel(
	conn: Sequelize,
	systemResources: typeof SystemResources,
) {
	const TABLE_NAME = "system-memory";
	const Model = SystemMemory.init({
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		total: {
			type: DataTypes.BIGINT,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Total memory is required"
				}
			}
		},
		used: {
			type: DataTypes.BIGINT,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Used memory is required",
				}
			}
		},
		free: {
			type: DataTypes.BIGINT,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Free memory is required",
				}
			}
		},
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
		timestamps: false,
    });
	
	Model.belongsTo(systemResources);
	
	return Model;
}
