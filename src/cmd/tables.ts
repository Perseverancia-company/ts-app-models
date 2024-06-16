import printMysqlEnvironmentVariables from '../env/printMysqlEnvironmentVariables';
import Models from "../Models";
import TablesController from "../lib/TablesController";
import RealEstateTables from '../lib/tables/RealEstate';

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
        await tc.initialize();
        await tc.upAll();
    }
    
    if(args.reset_tables) {
        await resetTables(models);
    }
    
    if(args.reset_real_estate) {
        const real = new RealEstateTables(models);
        await real.reset();
    }
}
