import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import SystemResources from "./SystemResources";

/**
 * System core
 */
export default class SystemCore extends Model<
    InferAttributes<
		SystemCore
    >,
    InferCreationAttributes<
		SystemCore,
        { omit: 'id' }
    >> {
    declare id: number;
	
	declare usagePercentage: number;
	declare freePercentage: number;
}

/**
 * System core
 */
export function createSystemCoreModel(
	conn: Sequelize,
	systemResources: typeof SystemResources,
) {
	const TABLE_NAME = "system-core";
	const Model = SystemCore.init({
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		usagePercentage: {
			type: DataTypes.FLOAT,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Usage percentage is required"
				}
			}
		},
		freePercentage: {
			type: DataTypes.FLOAT,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Free percentage is required",
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
