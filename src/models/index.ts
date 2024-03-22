/**
 * Runtime models are functions, you call them, and you get the model.
 * 
 * This is so that 'mysqlConn' function can fetch variables from the environment.
 * This part is very problematic, because once the environment variables
 * have been fetched you can't update a model to use a new env variable.
 */
import Category from "./Category";
import DebugPropertyImageUpload from "./DebugPropertyImageUpload";
import Price from "./Price";
import Property from "./Property";
import UserMessages from "./UserMessages";
import User from "./User";

const MODEL = {
    Category,
    DebugPropertyImageUpload,
    Price,
    Property,
    UserMessages,
    User,
};

export default MODEL;
