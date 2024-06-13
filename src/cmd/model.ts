import Models from "../Models";
import bcrypt from "bcrypt";

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
        console.log(`Tables are already opened when running this app.`);
    }
    
    if(args.seed_user) {
        await seedUser(models);
    }
}
