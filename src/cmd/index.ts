import { ArgumentParser } from "argparse";
import dotenv from "dotenv";

import tablesMain from "./tables";
import modelMain from "./model";
import Models from "../Models";

/**
 * Main
 */
export default async function main() {
	// Setup dotenv
	dotenv.config({
		path: ".env"
	});
	
	const parser = new ArgumentParser({
		description: "Argparse example"
	});
	
	// --- Tables ---
	parser.add_argument("--reset-tables", {
		help: "Destroy and create the tables again with the default data",
		action: "store_true"
	});
	
	parser.add_argument("--up-all", {
		help:"Create all models table",
		action: "store_true"
	});
	
	parser.add_argument("--drop-all", {
		help: "Drop all model tables",
		action: "store_true"
	});
	
	// Sync
	parser.add_argument("--sync-production", {
		help: "Sync production database",
		action: "store_true"
	});
	
	parser.add_argument("--sync-testing", {
		help: "Sync testing database",
		action: "store_true"
	});
	
	parser.add_argument("--sync-development", {
        help: "Sync development database",
        action: "store_true"
    });
	
	parser.add_argument("--sync-all", {
        help: "Sync all databases",
        action: "store_true"
    });
	
	parser.add_argument("--db-sync", {
		help: "Sync development database",
		action: "store_true"
	});
	
	parser.add_argument("--force-sync", {
		help: "Force sync the database",
        action: "store_true"
	});
	
	parser.add_argument("--reset-real-estate", {
		help: "Delete and create real estate tables",
		action: "store_true"
	});
	
	parser.add_argument("--reset-personal-log", {
		help: "Delete and create personal log tables",
		action: "store_true"
	});
	
	// On models
	parser.add_argument("--open-all", {
		help:"Create a model class and open connections to each model simultaneously to check if they work",
		action: "store_true"
	});
	
	parser.add_argument("--seed-user", {
		help: "Seed the user table",
		action: "store_true"
	});
	
	// Parse arguments
	const args = parser.parse_args();
	
    const models = new Models();
    
    // Tables
    await tablesMain(args, models);
    
    await modelMain(args, models);
    
    // process.exit(0);
}

main();
