import Models from "../Models";
import bcrypt from "bcrypt";

/**
 * Open all models
 */
async function openAll(models: Models) {
    const category = models.category();
    const debugPropertyimageUpload = models.debugPropertyImageUpload();
    const price = models.price();
    // This one opens three more
    const property = models.property();
    const user  = models.user;
    const userMessages = models.userMessages();
}

/**
 * Seed user
 */
async function seedUser(models: Models) {
    const TEST_USERS_SEED = [
        {
            name: "Rick",
            email: "rick@email.com",
            confirmedEmail: 1,
            password: bcrypt.hashSync("asd12345", 10)
        }
    ];
    
    const User = models.user;
    
    await User.bulkCreate(TEST_USERS_SEED);
}

/**
 * Main
 */
export default async function modelMain(args: any, models: Models) {
    if(args.open_all) {
        await openAll(models);
    }
    
    if(args.seed_user) {
        await seedUser(models);
    }
}
