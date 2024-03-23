import Models from "../Models";

/**
 * Open all models
 */
async function openAll() {
    const models = new Models();
    const category = models.category();
    const debugPropertyimageUpload = models.debugPropertyImageUpload();
    const price = models.price();
    // This one opens three more
    const property = models.property();
    const user  = models.user();
    const userMessages = models.userMessages();
}

/**
 * Main
 */
export default async function modelMain(args: any) {
    if(args.open_all) {
        await openAll();
    }
}
