import {
	Model,
	InferCreationAttributes,
	InferAttributes,
	Sequelize,
	DataTypes,
} from "sequelize";
import User from "../user/User";
import OAuth2Client from "./OAuth2Client";

/**
 * Address
 */
export default class OAuthRefreshToken extends Model<
	InferAttributes<OAuthRefreshToken>,
	InferCreationAttributes<
		OAuthRefreshToken,
		{ omit: "id" | "createdAt" | "updatedAt" }
	>
> {
	declare id: number;

	declare refreshToken: string;
	declare refreshTokenExpiresAt: Date;
	declare scope: string;
	
	declare userId: number;
	declare clientId: string;

	declare createdAt: Date;
	declare updatedAt: Date;
}

/**
 * Authorization token
 */
export function createOAuthRefreshToken(
	conn: Sequelize,
	oauth2Client: typeof OAuth2Client,
	user: typeof User
) {
	const TABLE_NAME = "oauth-refresh-token";
	const model = OAuthRefreshToken.init(
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			refreshToken: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			refreshTokenExpiresAt: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			scope: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			userId: {
				type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: user,
                    key: "id",
                },
            },
			clientId: {
				type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: oauth2Client,
                    key: "clientId",
                },
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

	// Should belong to user and client
	model.belongsTo(user, {
		foreignKey: "userId",
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
		targetKey: "id",
	});

	model.belongsTo(oauth2Client, {
		foreignKey: "clientId",
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
		targetKey: "clientId",
	});

	return model;
}
