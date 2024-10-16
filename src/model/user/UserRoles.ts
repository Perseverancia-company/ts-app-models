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
	InferCreationAttributes<UserRoles>
> {
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
	role: typeof Role
) {
	const TABLE_NAME = "user-roles";

	const UserRolesModel = UserRoles.init(
		{
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
