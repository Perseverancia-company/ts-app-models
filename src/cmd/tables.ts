import printMysqlEnvironmentVariables from '../env/printMysqlEnvironmentVariables';
import Models from "../Models";
import TablesController from "../lib/TablesController";
import TablesGroupController from '../lib/TablesGroupController';

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
    if(args.db_sync) {
        const tc = new TablesController(models);
        await tc.sync();
    }
    
    if(args.up_all) {
        printMysqlEnvironmentVariables();
        
        const tc = new TablesController(models);
        await tc.sync();
    }
	
	if(args.force_sync) {
		const tc = new TablesController(models);
        await tc.forceSync();
	}
    
	if(args.drop_all) {
		const tc = new TablesController(models);
		await tc.dropAll();
	}
	
    if(args.reset_tables) {
        await resetTables(models);
    }
    
	// Specific tables
    if(args.reset_real_estate) {
        const real = new TablesGroupController(models, 'real-estate');
        await real.reset();
    }
	
	if(args.reset_personal_log) {
		const personal = new TablesGroupController(models, 'personal-log');
        await personal.reset();
	}
}
