import {
	Model,
	InferAttributes,
	InferCreationAttributes,
	Sequelize,
	DataTypes,
} from "sequelize";
import User from "./User";
import Role from "./Role";

/**
 * UserRoles model
 */
export default class UserRoles extends Model<
	InferAttributes<UserRoles>,
	InferCreationAttributes<UserRoles, { omit: "id" }>
> {
	declare id: number;
	declare userId: number;
	declare roleName: string;
}

/**
 * Create UserRoles model
 *
 * @param conn
 * @returns
 */
export function createUserRolesModel(
	conn: Sequelize,
	user: typeof User,
	role: typeof Role,
	config?: {
		tableName: string;
	}
) {
	const TABLE_NAME =
		config && config.tableName ? config.tableName : "user-roles";

	const UserRolesModel = UserRoles.init(
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			userId: {
				type: DataTypes.BIGINT,
				references: {
					model: user,
					key: "id",
				},
			},
			roleName: {
				type: DataTypes.STRING,
				references: {
					model: role,
					key: "name",
				},
			},
			// TODO: Scopes
			// (It's json, but it can only be an array of strings)
			// scopes: {
			// 	type: DataTypes.JSON,
			// 	allowNull: false,
			// 	validate: {
			// 		isArray: true,
            //         notEmpty: true,
			// 	}
			// },
		},
		{
			sequelize: conn,
			tableName: TABLE_NAME,
			modelName: TABLE_NAME,
			timestamps: false,
		}
	);

	return UserRolesModel;
}
