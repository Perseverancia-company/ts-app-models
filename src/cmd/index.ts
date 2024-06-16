import { ArgumentParser } from "argparse";
import dotenv from "dotenv";

// Often this is run to test whether things work or not
// So import everything that may crash here
import mysqlConn from "../connection/mysqlConn";

import tablesMain from "./tables";
import modelMain from "./model";
import Models from "../Models";

// Setup dotenv
dotenv.config({
    path: ".env"
});

const parser = new ArgumentParser({
    description: "Argparse example"
});

// Tables
parser.add_argument("--reset-tables", {
    help: "Destroy and create the tables again with the default data",
    action: "store_true"
});

parser.add_argument("--up-all", {
    help:"Create all models table",
    action: "store_true"
});

parser.add_argument("--db-sync", {
    help: "Sync the database",
    action: "store_true"
});

parser.add_argument("--reset-real-estate", {
    help: "Delete and create real estate tables",
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

// Execute everything asynchronously
(async () => {
    const models = new Models();
    
    // Tables
    await tablesMain(args, models);
    
    await modelMain(args, models);
    
    process.exit(0);
})();
