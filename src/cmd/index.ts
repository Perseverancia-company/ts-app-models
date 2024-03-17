import { ArgumentParser } from "argparse";
import dotenv from "dotenv";

import tablesMain from "./tables";

// Setup dotenv
dotenv.config({
    path: ".env"
});

const parser = new ArgumentParser({
    description: "Argparse example"
});

parser.add_argument("--reset-tables", {
    help: "Destroy and create the tables again with the default data",
    action: "store_true"
});

// Parse arguments
const args = parser.parse_args();

// Execute everything asynchronously
(async () => {
    // Tables
    await tablesMain(args);
    
    process.exit(0);
})();
