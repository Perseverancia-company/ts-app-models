/**
 * TODO: Test OAuthAccessToken model
 * 
 * The current problem is that typescript is throwing an error with userId
 */
import { initializeDotenv } from "../../env";
import Models from "../../Models";

describe("OAuthAccessToken Model", () => {
	initializeDotenv();
	const models = new Models();
	const { OAuthAccessToken, User } = models;
	let users: Array<typeof User> = [];
	let accessTokens: Array<any> = [];

	beforeAll(async () => {
		// Create test users
        users = await Promise.all([
            User.create({
                name: "Test User 1",
                email: "test20@example.com",
                password: "password",
            }),
            User.create({
                name: "Test User 2",
                email: "test21@example.com",
                password: "password",
            }),
        ]) as any;
	});

	afterAll(async () => {
		// Delete test users
		for (const user of users) {
            await user.destroy();
        }
		
		// Delete test access tokens
		for (const accessToken of accessTokens) {
            await accessToken.destroy();
        }
	});

	it("should create an OAuthAccessToken instance successfully", async () => {
		const user: any = users[0];
		
		const accessToken = await OAuthAccessToken.create({
			clientId: "test-client-id",
			accessToken: "test-access-token",
			accessTokenExpiresAt: new Date(Date.now() + 3600 * 1000), // 1 hour expiration
			scopes: "read write",
			userId: user.id, // Assuming you have a userId field to relate to User
		});

		expect(accessToken).toBeDefined();
		expect(accessToken.accessToken).toBe("test-access-token");
		expect(accessToken.clientId).toBe("test-client-id");
		expect(accessToken.accessTokenExpiresAt).toBeInstanceOf(Date);
		expect(accessToken.scopes).toBe("read write");
	});

	it("should not create an OAuthAccessToken if accessToken is empty", async () => {
		const user: any = users[0];
		
		// Assert user id exists
		expect(user.id).toBeDefined();
		
		await expect(
			OAuthAccessToken.create({
				clientId: "test-client-id",
				accessToken: "",
				accessTokenExpiresAt: new Date(Date.now() + 3600 * 1000),
				userId: user.id,
				
				scopes: "read write",
				
			})
		).rejects.toThrow("Access token is required");
	});

	it("should handle missing fields gracefully", async () => {
		await expect(
			OAuthAccessToken.create({
				clientId: "test-client-id",
				// Missing accessToken and other fields
			} as any)
		).rejects.toThrow();
	});

	it("should associate with User model correctly", async () => {
		// Create token
		const user: any = users[1];
		const accessToken = await OAuthAccessToken.create({
			clientId: "test-client-id-2",
			accessToken: "test-access-token-2",
			accessTokenExpiresAt: new Date(Date.now() + 3600 * 1000),
			scopes: "read",
			userId: user.id,
		});
		
		// Find the token
		const tokenWithUser = await OAuthAccessToken.findOne({
			where: { id: accessToken.id },
			include: [{ model: User }],
		});
		
		// Check if it exists
		expect(tokenWithUser).toBeDefined();
		if(!tokenWithUser) {
			throw new Error("Failed to find token with user");
		}
		
		// Insert to destroy later
		accessTokens.push(tokenWithUser);

		expect(tokenWithUser.userId).toBe(user.id);
		expect(tokenWithUser.accessToken).toBe("test-access-token-2");
	});

	// You can add more tests as needed for other validations and scenarios
});
