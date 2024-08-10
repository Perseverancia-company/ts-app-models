import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";

/**
 * File
 * 
 * Don't include the file name in the path, it should be created by the user
 */
export default class File extends Model<
    InferAttributes<
		File
    >,
    InferCreationAttributes<
		File,
        { omit: "id" | 'created' | 'updated' | "lastOpened" }
    >> {
	declare id: number;
	declare name: string;
	declare size: number;
	declare path: string;
	declare md5: string;
    declare created: Date;
    declare updated: Date;
	declare lastOpened: Date;
}

/**
 * File information
 */
export function createFileModel(
	conn: Sequelize
) {
	const TABLE_NAME = "file";
	const Model = File.init({
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
		size: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		path: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		md5: {
			type: DataTypes.STRING(16),
			allowNull: false,
		},
        created: DataTypes.DATE,
        updated: DataTypes.DATE,
		lastOpened: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
		timestamps: false
    });
	
	return Model;
}
