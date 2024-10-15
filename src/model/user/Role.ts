import {
	Model,
	InferCreationAttributes,
	InferAttributes,
	Sequelize,
	DataTypes,
} from "sequelize";

/**
 * Role model
 */
export default class Role extends Model<
	InferAttributes<Role>,
	InferCreationAttributes<Role, { omit: "createdAt" | "updatedAt" }>
> {
	declare name: string;
	declare description: string;

	declare createdAt: Date;
	declare updatedAt: Date;
}

/**
 * Role model
 */
export function createRoleModel(conn: Sequelize) {
	const TABLE_NAME = "role";
	const Model = Role.init(
		{
			name: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			description: {
				type: DataTypes.STRING,
			},
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			sequelize: conn,
			tableName: TABLE_NAME,
			modelName: TABLE_NAME,
		}
	);

	return Model;
}
