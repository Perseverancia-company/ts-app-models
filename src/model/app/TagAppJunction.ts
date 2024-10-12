import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import App from "./App";
import AppTag from "./AppTag";

/**
 * Tag app junction
 */
export default class TagAppJunction extends Model<
    InferAttributes<
		TagAppJunction
    >,
    InferCreationAttributes<
		TagAppJunction,
        { omit: 'createdAt' | 'updatedAt' }
    >> {
	declare appTagName: string;
	declare appName: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Tag app junction
 */
export function createTagAppJunction(
	conn: Sequelize,
	appTag: typeof AppTag,
	app: typeof App,
) {
	const TABLE_NAME = "tag-app-junction";
	const Model = TagAppJunction.init({
		appTagName: { 
			allowNull: false,
			type: DataTypes.STRING(128),
			references: {
				model: appTag,
				key: 'name'
			}
		},
		appName: { 
			allowNull: false,
			type: DataTypes.STRING(128),
			references: {
				model: app,
				key: 'name'
			}
		},
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
    });
	
	return Model;
}
