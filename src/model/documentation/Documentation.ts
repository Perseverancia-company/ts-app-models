import {
	Model,
	InferCreationAttributes,
	InferAttributes,
	Sequelize,
	DataTypes,
} from "sequelize";

/**
 * Documentation
 */
export default class Documentation extends Model<
	InferAttributes<Documentation>,
	InferCreationAttributes<Documentation, { omit: "id" }>
> {
	declare id: number;
	declare title: string;
	declare content: string;
	declare url: string;
	declare language: string;
	declare tags: string[];
	declare requiredRoles: string[];
}

/**
 * Documentation model
 */
export function createDocumentationModel(conn: Sequelize) {
	const TABLE_NAME = "documentation";

	const Model = Documentation.init(
		{
			id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			content: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			url: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			language: {
				type: DataTypes.STRING,
				allowNull: false, // e.g., "en", "es", "fr"
			},
			// Mysql doesn't has support for arrays
			tags: {
				type: DataTypes.JSON,
			},
			requiredRoles: {
                type: DataTypes.JSON,
            },
		},
		{
			sequelize: conn,
			timestamps: false,
			tableName: TABLE_NAME,
			modelName: TABLE_NAME,
		}
	);

	return Model;
}
