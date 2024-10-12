import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";

/**
 * Folder
 */
export default class Folder extends Model<
    InferAttributes<
		Folder
    >,
    InferCreationAttributes<
		Folder,
        { omit: "id" | 'created' | 'updated' | "lastOpened" }
    >> {
	declare id: number;
	declare path: string;
	declare parent_id: number;
    declare created: Date;
    declare updated: Date;
	declare lastOpened: Date;
}

/**
 * Folder information
 */
export function createFolderModel(
	conn: Sequelize
) {
	const TABLE_NAME = "folder";
	const Model = Folder.init({
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		path: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
        parent_id: {
            type: DataTypes.BIGINT,
            references: {
                model: TABLE_NAME,
                key: 'id'
            }
        },
        created: DataTypes.DATE,
        updated: DataTypes.DATE,
		lastOpened: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
		timestamps: false,
    });
	
    // Define the self-referential association
    Model.hasMany(Model, { foreignKey: 'parent_id', as: 'child_folders' });
    Model.belongsTo(Model, { foreignKey: 'parent_id', as: 'parent_folder' });
	
	return Model;
}
