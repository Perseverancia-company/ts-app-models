import { initializeDotenv } from "../../env";
import Models from "../../Models";

/**
 * Test suite for role creation
 */
describe("Role creation", () => {
	initializeDotenv();

	// Initialize Models instance
	const models = new Models();

	beforeAll(async () => {
		const role = await models.Role.create({
			name: "test-role",
			description: "Test role",
		});
	});

	afterAll(async () => {
		// Remove created user
		await models.User.destroy({
			where: { email: "test1@example.com" },
		}).catch((err) => {});
		await models.User.destroy({
			where: { email: "test2@example.com" },
		}).catch((err) => {});

		// Remove created role
		await models.Role.destroy({ where: { name: "test-role" } }).catch(
			(err) => {}
		);
	});

	/**
	 * Test case: Assign role to user
	 */
	it("should assign role to user", async () => {
		const models = new Models();
		const user = await models.User.create({
			name: "Test User",
			email: "test1@example.com",
			password: "password",
		});

		// Assign role to user
		await user.assignRole("test-role", models.UserRoles);

		// Verify role assignment
		const userRole = await models.UserRoles.findOne({
			where: { userId: user.id, roleName: "test-role" },
		});
		expect(userRole).not.toBeNull();
	});

	/**
	 * Test case: Prevent duplicate role assignment
	 */
	it("should not assign same role twice", async () => {
		const models = new Models();
		const user = await models.User.create({
			name: "Test User",
			email: "test2@example.com",
			password: "password",
		});

		// Assign role to user
		await user.assignRole("test-role", models.UserRoles);

		// Attempt to assign same role again
		await user.assignRole("test-role", models.UserRoles);

		// Verify only one role assignment exists
		const userRoles = await models.UserRoles.findAll({
			where: { userId: user.id, roleName: "test-role" },
		});
		expect(userRoles.length).toBe(1);
	});
});
