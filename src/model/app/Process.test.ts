import { initializeDotenv } from "../../env";
import Models from "../../Models";
import Process from "./Process";

describe("Process Model Tests", () => {
	initializeDotenv();

	// Initialize Models instance
	const models = new Models();
	const { Process } = models;

	// Array to store created models for cleanup
	let createdModels: Process[] = [];

	beforeAll(async () => {
		process.env.NODE_ENV = "testing";
	});

	afterAll(async () => {
		// Clean up all created models
		for (const model of createdModels) {
			await model.destroy();
		}

		// Close the Sequelize connection
		await models.connection.close();
	});

	test("Should properly initialize the Process model", async () => {
		expect(Process).toBeDefined();
		expect(Process.tableName).toBe("process");
	});

	test("Should create a valid Process model", async () => {
		const processInstance = await Process.create({
			name: "authentication",
			pid: 1234,
			url: "http://localhost:3000",
			appType: "server",
		});

		// Add to cleanup array
		createdModels.push(processInstance);

		expect(processInstance.name).toBe("authentication");
		expect(processInstance.pid).toBe(1234);
		expect(processInstance.url).toBe("http://localhost:3000");
		expect(processInstance.appType).toBe("server");
	});

	test("Should update pid to null", async () => {
		const processInstance = await Process.create({
			name: "updatable-process",
			pid: 3456,
			url: "http://localhost:6000",
			appType: "application",
		});

		// Add to cleanup array
		createdModels.push(processInstance);

		// Update pid to null
		processInstance.pid = null;
		await processInstance.save();

		const updatedInstance = await Process.findByPk("updatable-process");
		expect(updatedInstance?.pid).toBeNull();
	});

	test("Should destroy a Process model", async () => {
		const processInstance = await Process.create({
			name: "destroyable-process",
			pid: 1111,
			url: "http://localhost:7000",
			appType: "frontend",
		});

		// Destroy the instance
		await processInstance.destroy();

		const destroyedInstance = await Process.findByPk("destroyable-process");
		expect(destroyedInstance).toBeNull();
	});
});
