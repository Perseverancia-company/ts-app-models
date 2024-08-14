import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import SystemCore from "./SystemCore";
import SystemMemory from "./SystemMemory";
import StorageDevice from "./StorageDevice";


/**
 * System resources
 */
export default class SystemResources extends Model<
    InferAttributes<
		SystemResources
    >,
    InferCreationAttributes<
		SystemResources,
        { omit: 'id' }
    >> {
    declare id: number;
	
	declare evalTime: Date;
}

/**
 * System resources
 */
export function createSystemResourcesModel(
	conn: Sequelize,
) {
	const TABLE_NAME = "system-resources";
	const Model = SystemResources.init({
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		evalTime: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Evaluation time is required"
				}
			}
		},
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
		timestamps: false,
    });
	
	return Model;
}
