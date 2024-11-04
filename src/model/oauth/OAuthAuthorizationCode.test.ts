import Models from "../../Models";
import { initializeDotenv } from "../../env";
import { v4 as uuidv4 } from "uuid";
import { generateRandomSecret } from "../../lib/secret";

describe("OAuthAuthorizationCode Model", () => {
	process.env.NODE_ENV === "testing";
	initializeDotenv();
	const models = new Models();

	const { User, OAuth2Client, OAuthAuthorizationCode } = models;

	const clientId = uuidv4();
	const clientSecret = generateRandomSecret();
	const authorizationCode = generateRandomSecret();

	let user: any;
	let client: any;
	let authCode: any;

	beforeAll(async () => {
		// Initialize models
		try {
			user = await User.create({
				name: "John Doe",
				email: "john_doe_1@example.com",
				password: "password123",
			});
		} catch (err) {
			user = await User.findOne({
				where: { email: "john_doe_1@example.com" },
			});
		}

		try {
			client = await OAuth2Client.create({
				clientId,
				clientSecret,
				name: "Test Client",
				authorizedOrigins: "http://localhost",
				authorizedRedirects: "http://localhost/callback",
				grantTypes: "authorization_code",
				authorizationScopes: "read",
			});
		} catch (err) {}

		try {
			authCode = await OAuthAuthorizationCode.create({
				authorizationCode,
				expiresAt: new Date(Date.now() + 600000),
				redirectUri: "http://localhost/callback",
				scope: "read",
				userId: user.id,
				clientId: client.clientId,
			});
		} catch (err) {}
	});

	afterAll(async () => {});

	it("should create a valid authorization code", async () => {
		expect(authCode).toBeDefined();
		expect(authCode.authorizationCode).toBe(authorizationCode);
		expect(authCode.userId).toBe(user.id);
		expect(authCode.clientId).toBe(client.clientId);
	});

	it("should throw validation error for missing required fields", async () => {
		await expect(
			OAuthAuthorizationCode.create({
				authorizationCode: "",
				expiresAt: new Date(Date.now() + 600000),
				redirectUri: "",
				scope: "",
				userId: user.id,
				clientId: client.clientId,
			})
		).rejects.toThrow();
	});

	it("should associate with User and Client", async () => {
		const fetchedAuthCode = await OAuthAuthorizationCode.findOne({
			where: { authorizationCode },
			include: [User, OAuth2Client],
		});
		
		expect(fetchedAuthCode).toBeDefined();
		if(!fetchedAuthCode) {
			throw new Error(`OAuth authorization code not found`);
		}
		
		const authoCode = JSON.parse(JSON.stringify(fetchedAuthCode));
		
		expect(authoCode.user).toBeDefined();
		expect(authoCode.user.id).toBe(user.id);
		expect(authoCode["oauth2-client"]).toBeDefined();
	});

	// TODO: I don't think this is possible other than using a wrapper for deletion
	// it("should delete the authorization code when user is deleted", async () => {
	// 	await user.destroy();
	// 	const deletedAuthCode = await TestAuthCode.findByPk(authCode.id);

	// 	expect(deletedAuthCode).toBeNull();
	// });
});
