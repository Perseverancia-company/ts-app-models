import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import File from "./File";
import Folder from "./Folder";

/**
 * Folder file junction
 */
export default class FolderFileJunction extends Model<
    InferAttributes<
		FolderFileJunction
    >,
    InferCreationAttributes<
		FolderFileJunction,
        { omit: 'id' | 'createdAt' | 'updatedAt' }
    >> {
	declare id: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Folder file junction model
 */
export function createFolderFileJunctionModel(
	conn: Sequelize,
	file: typeof File,
	folder: typeof Folder,
) {
	const TABLE_NAME = "folder-file-junction";
	const Model = FolderFileJunction.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
    });
	
	Model.belongsTo(file);
	Model.belongsTo(folder);
	
	return Model;
}
