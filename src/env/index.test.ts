import databaseName from "./index";

describe("databaseName function", () => {
	afterEach(() => {
		process.env.NODE_ENV = "testing";
	});

	it("should return different database names for 'production', 'development', and 'testing'", () => {
		process.env.NODE_ENV = "production";
		const prodName = databaseName();

		process.env.NODE_ENV = "development";
		const devName = databaseName();

		process.env.NODE_ENV = "testing";
		const testName = databaseName();

		// Ensure all are different
		expect(prodName).not.toBe(devName);
		expect(prodName).not.toBe(testName);
		expect(devName).not.toBe(testName);
	});
});
