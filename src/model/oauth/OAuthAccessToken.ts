import {
	Model,
	InferCreationAttributes,
	InferAttributes,
	Sequelize,
	DataTypes,
} from "sequelize";
import User from "../user/User";

/**
 * Address
 */
export default class OAuthAccessToken extends Model<
	InferAttributes<OAuthAccessToken>,
	InferCreationAttributes<OAuthAccessToken, { omit: "id" | "createdAt" | "updatedAt" }>
> {
	declare id: number;

	declare clientId: string;
	declare accessToken: string;
	declare accessTokenExpiresAt: Date;
	declare userId: number;

	// Comma separated
	declare scopes: string;
	declare createdAt: Date;
	declare updatedAt: Date;
}

/**
 * Address
 */
export function createOAuthAccessToken(conn: Sequelize, user: typeof User) {
	const TABLE_NAME = "oauth-access-token";
	const model = OAuthAccessToken.init(
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			clientId: {
				type: DataTypes.STRING,
			},
			accessToken: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Access token is required",
					},
				},
			},
			// We need this otherwise typescript throws an error
			userId: {
				type: DataTypes.BIGINT,
				references: {
					model: user,
					key: 'id'
				},
			},
			accessTokenExpiresAt: {
				type: DataTypes.DATE,
			},
			scopes: {
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
	
	// We need this otherwise sequelize throws an error
	model.belongsTo(user, {
		foreignKey: "userId",
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
		targetKey: "id",
	});

	return model;
}
