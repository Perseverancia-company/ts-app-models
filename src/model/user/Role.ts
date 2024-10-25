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
export function createRoleModel(
	conn: Sequelize,
	config?: {
		tableName: string;
	}
) {
	const TABLE_NAME = config && config.tableName ? config.tableName : "role";
	const Model = Role.init(
		{
			name: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			description: {
				type: DataTypes.STRING,
			},
			// TODO: Add scopes
			// TODO: Delete dates
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
