import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import SystemResources from "./SystemResources";

export type DiskKind = "HDD" | "SSD" | "Unknown";

/**
 * Storage device
 */
export default class StorageDevice extends Model<
    InferAttributes<
		StorageDevice
    >,
    InferCreationAttributes<
		StorageDevice,
        { omit: 'id' }
    >> {
    declare id: number;
	
	declare total: number;
	declare used: number;
	declare name: string;
	declare isRemovable: boolean;
	declare kind: DiskKind;
}

/**
 * Storage device
 */
export function createStorageDeviceModel(
	conn: Sequelize,
	systemResources: typeof SystemResources,
) {
	const TABLE_NAME = "storage-device";
	const Model = StorageDevice.init({
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
					msg: "Total storage space is required"
				}
			}
		},
		used: {
			type: DataTypes.BIGINT,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Used storage space is required",
				}
			}
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Name is required",
				}
			}
		},
		isRemovable: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Is removable is required",
				}
			}
		},
		kind: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
                notEmpty: {
                    msg: "Kind is required",
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
