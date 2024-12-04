import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import App from "./App";
import AppGroup from "./AppGroup";

/**
 * Group app junction table
 */
export default class GroupAppJunction extends Model<
    InferAttributes<
		GroupAppJunction
    >,
    InferCreationAttributes<
		GroupAppJunction,
        { omit: 'createdAt' | 'updatedAt' }
    >> {
	declare appName: string;
	declare groupId: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * App information
 */
export function createGroupAppJunction(
	conn: Sequelize,
	app: typeof App,
	appGroup: typeof AppGroup
) {
	const TABLE_NAME = "group-app-junction";
	const Model = GroupAppJunction.init({
		appName: {
			allowNull: false,
			type: DataTypes.STRING(128),
			references: {
				model: app,
				key: 'name'
			}
		},
		groupId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references: {
				model: appGroup,
				key: 'id'
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
