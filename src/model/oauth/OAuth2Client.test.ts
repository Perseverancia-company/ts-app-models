import { v4 as uuidv4 } from "uuid";

import OAuth2Client from "./OAuth2Client";
import { initializeDotenv } from "../../env";
import Models from "../../Models";
import { generateRandomSecret } from "../../lib/secret";

describe("OAuth2Client Model", () => {
	initializeDotenv();
	
	// Initialize Models instance
	const models = new Models();
	const { OAuth2Client } = models;
	
	// Array to store created models for cleanup
	let createdModels: OAuth2Client[] = [];

	beforeAll(async () => {
		process.env.NODE_ENV = "testing";
	});

	afterAll(async () => {
		// Clean up all created models
		for (const model of createdModels) {
			await model.destroy();
		}
	});
	
	it("should create an OAuth2Client instance successfully", async () => {
		const uniqueClientId = uuidv4();
		const uniqueClientSecret = generateRandomSecret();

		const newClient = await OAuth2Client.create({
			clientId: uniqueClientId,
			name: "Test Client",
			clientSecret: uniqueClientSecret,
			authorizedOrigins: "http://localhost,http://example.com",
			authorizedRedirects:
				"http://localhost/redirect,http://example.com/redirect",
			grantTypes: "authorization_code,refresh_token",
			authorizationScopes: "read write",
		});

		// Store created model for cleanup
		createdModels.push(newClient);

		expect(newClient).toBeDefined();
		expect(newClient.clientId).toBe(uniqueClientId);
		expect(newClient.clientSecret).toBe(uniqueClientSecret);
		expect(newClient.authorizedOrigins).toBe(
			"http://localhost,http://example.com"
		);
		expect(newClient.grantTypes).toContain("authorization_code");
	});

	it("should not create an OAuth2Client if clientId is not unique", async () => {
		const uniqueClientId = uuidv4();
		const firstClient = await OAuth2Client.create({
			clientId: uniqueClientId,
			name: "First Client",
			clientSecret: generateRandomSecret(),
			authorizedOrigins: "http://localhost",
			authorizedRedirects: "http://localhost/redirect",
			grantTypes: "authorization_code",
			authorizationScopes: "read",
		});

		// Store created model for cleanup
		createdModels.push(firstClient);

		await expect(
			OAuth2Client.create({
				clientId: uniqueClientId, // Using the same clientId to test duplication
				name: "Duplicate Client",
				clientSecret: generateRandomSecret(),
				authorizedOrigins: "http://example.com",
				authorizedRedirects: "http://example.com/redirect",
				grantTypes: "authorization_code",
				authorizationScopes: "write",
			})
		).rejects.toThrow();
	});

	it("should validate that clientSecret is not empty", async () => {
		await expect(
			OAuth2Client.create({
				clientId: uuidv4(),
				name: "Client Without Secret",
				clientSecret: "", // Invalid: empty secret
				authorizedOrigins: "http://localhost",
				authorizedRedirects: "http://localhost/redirect",
				grantTypes: "authorization_code",
				authorizationScopes: "read",
			})
		).rejects.toThrow();
	});

	it("should handle missing fields gracefully", async () => {
		await expect(
			OAuth2Client.create({
				clientId: uuidv4(),
				name: "Client Missing Fields",
				// Missing clientSecret and other fields
			} as any)
		).rejects.toThrow();
	});
});
