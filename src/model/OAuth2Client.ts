import {
	Model,
	InferCreationAttributes,
	InferAttributes,
	Sequelize,
	DataTypes,
} from "sequelize";

/**
 * OAuth 2 client
 */
export default class OAuth2Client extends Model<
	InferAttributes<OAuth2Client>,
	InferCreationAttributes<
		OAuth2Client,
		{ omit: "id" | "createdAt" | "updatedAt" }
	>
> {
	declare id: number;
	
	declare name: string;
	declare clientId: string;
	declare clientSecret: string;

	declare createdAt: Date;
	declare updatedAt: Date;
}

/**
 * OAuth 2 client
 */
export function createOAuth2Client(conn: Sequelize) {
	const TABLE_NAME = "oauth2-client";
	const Model = OAuth2Client.init(
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
			},
			clientId: {
				type: DataTypes.STRING,
				unique: true,
			},
			clientSecret: {
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
