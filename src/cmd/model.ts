import Models from "../Models";
import { createAdminUser, createNormalUser } from "../seed";

/**
 * Main
 */
export default async function modelMain(args: any, models: Models) {
	if (args.open_all) {
		console.log(`Tables are already opened when running this app.`);
	}

	if (args.seed_user) {
		await Promise.all([
			createAdminUser(models),
			createNormalUser(models),
		]);
	}
}
