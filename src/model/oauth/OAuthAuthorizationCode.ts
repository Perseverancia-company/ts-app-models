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
export default class OAuthAuthorizationCode extends Model<
	InferAttributes<OAuthAuthorizationCode>,
	InferCreationAttributes<
		OAuthAuthorizationCode,
		{ omit: "id" | "createdAt" | "updatedAt" }
	>
> {
	declare id: number;

	declare authorizationCode: string;
	declare expiresAt: Date;
	declare redirectUri: string;
	declare scope: string;
	
	declare userId: number;
	declare clientId: number;

	declare createdAt: Date;
	declare updatedAt: Date;
}

/**
 * Authorization token
 */
export function createOAuthAuthorizationCode(
	conn: Sequelize,
	oauth2Client: typeof OAuth2Client,
	user: typeof User
) {
	const TABLE_NAME = "oauth-authorization-code";
	const model = OAuthAuthorizationCode.init(
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			authorizationCode: {
				type: DataTypes.STRING,
				allowNull: false,
				// FIXME: Big mistake
				// This has to be unique
				// unique: true,
				validate: {
					notEmpty: {
						msg: "Authorization code is required",
					},
				},
			},
			expiresAt: {
				type: DataTypes.DATE,
			},
			redirectUri: {
				type: DataTypes.STRING,
			},
			scope: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Scope is required",
					},
				},
			},
			userId: {
				type: DataTypes.BIGINT,
                allowNull: false,
				references: {
					model: user,
					key: 'id'
				},
            },
			clientId: {
				type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Client ID is required",
                    },
                },
				references: {
					model: oauth2Client,
					key: 'clientId'
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
