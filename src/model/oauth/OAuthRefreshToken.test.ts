import { initializeDotenv } from "../../env";
import { generateRandomSecret } from "../../lib/secret";
import Models from "../../Models";

describe("OAuthRefreshToken Model", () => {
	initializeDotenv();
	const models = new Models();
	const { OAuthRefreshToken, User, OAuth2Client } = models;
	
	let testUser: any;
	let testClient: any;
	let refreshToken: any;

	beforeAll(async () => {
		// Create a test user and client
		testUser = await User.create({
			name: "Test User 1",
			email: "test22@example.com",
			password: "password",
		});
		testClient = await OAuth2Client.create({
			clientId: "test-client-id",
			name: "Test Client",
			clientSecret: generateRandomSecret(),
			authorizationScopes: "user:read"
		});
	});

	afterAll(async () => {
		// Cleanup: Delete test data
		if (refreshToken) await refreshToken.destroy();
		await testClient.destroy();
		await testUser.destroy();
	});

	it("should create an OAuthRefreshToken instance successfully", async () => {
		refreshToken = await OAuthRefreshToken.create({
			refreshToken: "test-refresh-token",
			refreshTokenExpiresAt: new Date(Date.now() + 3600 * 1000), // Expires in 1 hour
			scope: "read",
			userId: testUser.id,
			clientId: testClient.clientId,
		});
		// console.log(`Created refresh token: `, refreshToken);

		expect(refreshToken).toBeDefined();
		expect(refreshToken.refreshToken).toBe("test-refresh-token");
		expect(refreshToken.userId).toBe(testUser.id);
		expect(refreshToken.clientId).toBe(testClient.clientId);
	});

	it("should fail if userId is missing", async () => {
		await expect(
			OAuthRefreshToken.create({
				refreshToken: "invalid-refresh-token",
				refreshTokenExpiresAt: new Date(Date.now() + 3600 * 1000),
				scope: "read",
				clientId: testClient.clientId,
			} as any)
		).rejects.toThrow();
	});

	it("should fail if clientId is missing", async () => {
		await expect(
			OAuthRefreshToken.create({
				refreshToken: "invalid-refresh-token",
				refreshTokenExpiresAt: new Date(Date.now() + 3600 * 1000),
				scope: "read",
				userId: testUser.id,
			} as any)
		).rejects.toThrow();
	});

	it("should associate with User and OAuth2Client models correctly", async () => {
		const tokenWithAssociations = await OAuthRefreshToken.findOne({
			where: { id: refreshToken.id },
			include: [{ model: User }, { model: OAuth2Client }],
		});
		
		const data = JSON.parse(JSON.stringify(tokenWithAssociations));
		
		expect(tokenWithAssociations).toBeDefined();
		if (!tokenWithAssociations) {
			throw new Error("Failed to find token with associations");
		}
		
		expect(data.user).toBeDefined();
		expect(data.user.id).toBe(testUser.id);
		expect(data["oauth2-client"]).toBeDefined();
	});
});
