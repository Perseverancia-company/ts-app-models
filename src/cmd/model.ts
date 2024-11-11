import Models from "../Models";

/**
 * Main
 */
export default async function modelMain(args: any, models: Models) {
	if (args.open_all) {
		console.log(`Tables are already opened when running this app.`);
	}

	if (args.seed_user) {
		console.log(`Incomplete`);
		await Promise.all([
		]);
	}
}
