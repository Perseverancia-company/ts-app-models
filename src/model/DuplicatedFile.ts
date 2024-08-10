import { Model, InferCreationAttributes, InferAttributes, Sequelize } from "sequelize";
import File from "./File";

/**
 * Duplicated file
 * 
 * We only need to track the file id here
 */
export default class DuplicatedFile extends Model<
    InferAttributes<
		DuplicatedFile
    >,
    InferCreationAttributes<
		DuplicatedFile
    >> {
}

/**
 * DuplicatedFile information
 */
export function createDuplicatedFileModel(
	conn: Sequelize,
	file: typeof File,
) {
	const TABLE_NAME = "duplicated-file";
	const Model = DuplicatedFile.init({
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
		timestamps: false,
    });
	
	Model.belongsTo(file);
	
	return Model;
}
