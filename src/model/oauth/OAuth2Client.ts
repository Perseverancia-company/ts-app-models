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
		{ omit: "createdAt" | "updatedAt" | "grantTypes" | "authorizedOrigins" | "authorizedRedirects" }
	>
> {
	declare clientId: string;
	declare name: string;
	declare clientSecret: string;

	// These are comma separated strings
	declare authorizedOrigins: string;
	declare authorizedRedirects: string;
	declare grantTypes: string;
	declare authorizationScopes: string;

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
			// STRING
			// It's a UUID, but DataTypes.UUID causes errors
			clientId: {
				type: DataTypes.STRING,
				primaryKey: true,
				unique: true,
			},
			name: {
				type: DataTypes.STRING,
			},
			clientSecret: {
				type: DataTypes.STRING,
			},

			// These are comma separated strings
			authorizedOrigins: {
				type: DataTypes.STRING,
				comment: "Comma-separated list of authorized origins",
			},
			authorizedRedirects: {
				type: DataTypes.STRING,
				comment: "Comma-separated list of authorized redirects",
			},
			grantTypes: {
				type: DataTypes.STRING,
				comment: "Comma-separated list of grant types",
			},
			authorizationScopes: {
				type: DataTypes.STRING,
				comment: "Space-separated list of authorization scopes",
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
