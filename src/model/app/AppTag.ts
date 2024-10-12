import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";

/**
 * App tag
 */
export default class AppTag extends Model<
    InferAttributes<
		AppTag
    >,
    InferCreationAttributes<
		AppTag,
        { omit: 'createdAt' | 'updatedAt' }
    >> {
	declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * App information
 */
export function createAppTagModel(
	conn: Sequelize
) {
	const TABLE_NAME = "app-tag";
	const Model = AppTag.init({
		name: { 
			primaryKey: true,
			type: DataTypes.STRING(128),
			allowNull: false,
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
