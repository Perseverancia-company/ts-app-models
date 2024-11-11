import printMysqlEnvironmentVariables from "../env/printMysqlEnvironmentVariables";
import Models from "../Models";
import TablesController from "../lib/TablesController";
import TablesGroupController from "../lib/TablesGroupController";
import mysqlConn, {
	mysqlProductionConnection,
	mysqlTestingConnection,
} from "../connection/mysqlConn";
import databaseName, { isDevelopment, isTesting } from "../env";

/**
 * Reset tables
 */
export async function resetTables(models: Models) {
	printMysqlEnvironmentVariables();

	const tablesController = new TablesController(models);

	await tablesController.initialize();
	await tablesController.dropAll();
	await tablesController.upAll();
}

/**
 * Tables main
 *
 * @param args
 */
export default async function tablesMain(args: any, models: Models) {
	// Production
	if (args.sync_production) {
		const productionConnection = mysqlProductionConnection();
		const productionModels = new Models({
			connection: productionConnection,
		});
		const tc = new TablesController(productionModels);
		await tc.sync();
	}

	// Testing
	if (args.sync_testing) {
		const testingConnection = mysqlTestingConnection();
		const testingModels = new Models({
			connection: testingConnection,
		});
		const tc = new TablesController(testingModels);
		await tc.sync();
	}

	// Be really careful with this one because it may wipe the whole database
	// There's a strict check on isTesting but it may end up using the default database name
	// if not properly configured
	if (args.sync_testing_force) {
		if (isTesting()) {
			// Maybe prompt for confirmation?
			const dbName = databaseName();
			console.log(`Database name: `, dbName);

			const testingConnection = mysqlTestingConnection();
			const testingModels = new Models({
				connection: testingConnection,
			});
			const tc = new TablesController(testingModels);
			await tc.forceSync();
		} else {
			console.error(
				"This command should only be used in a testing environment."
			);
		}
	}

	if (args.sync_development_force) {
		if (isDevelopment()) {
			// Maybe prompt for confirmation?
			const dbName = databaseName();
			console.log(`Database name: `, dbName);

			const testingConnection = mysqlConn();
			const testingModels = new Models({
				connection: testingConnection,
			});
			const tc = new TablesController(testingModels);
			await tc.forceSync();
		} else {
			console.error(
				"This command should only be used in a development environment."
			);
		}
	}

	// Development
	if (args.sync_development) {
		const developmentConnection = mysqlConn();
		const developmentModels = new Models({
			connection: developmentConnection,
		});
		const tc = new TablesController(developmentModels);
		await tc.sync();
	}

	// Sync all
	if (args.sync_all) {
		const productionConnection = mysqlProductionConnection();
		const testingConnection = mysqlTestingConnection();
		const developmentConnection = mysqlConn();

		const productionModels = new Models({
			connection: productionConnection,
		});
		const testingModels = new Models({
			connection: testingConnection,
		});
		const developmentModels = new Models({
			connection: developmentConnection,
		});

		const productionTc = new TablesController(productionModels);
		await productionTc.sync();

		const testingTc = new TablesController(testingModels);
		await testingTc.sync();

		const developmentTc = new TablesController(developmentModels);
		await developmentTc.sync();
	}

	// Development
	if (args.db_sync) {
		const tc = new TablesController(models);
		await tc.sync();
	}

	if (args.up_all) {
		printMysqlEnvironmentVariables();

		const tc = new TablesController(models);
		await tc.sync();
	}

	if (args.force_sync) {
		const tc = new TablesController(models);
		await tc.forceSync();
	}

	if (args.drop_all) {
		const tc = new TablesController(models);
		await tc.dropAll();
	}

	if (args.reset_tables) {
		await resetTables(models);
	}

	// Specific tables
	if (args.reset_real_estate) {
		const real = new TablesGroupController(models, "real-estate");
		await real.reset();
	}

	if (args.reset_personal_log) {
		const personal = new TablesGroupController(models, "personal-log");
		await personal.reset();
	}
}
