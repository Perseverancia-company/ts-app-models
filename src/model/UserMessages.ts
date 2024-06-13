import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import User from "./User";

/**
 * User model
 */
export default class UserMessages extends Model<
    InferAttributes<
        UserMessages
    >,
    InferCreationAttributes<
        UserMessages,
        { omit: 'id' | 'title' | 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
    declare title: string;
    declare message: string;
    declare status: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * User messages
 * 
 * Messages sent from the system to the user.
 * 
 * Like:
 * * Failed validation
 * * Notifications
 * * Offers
 * * Suggestions
 * 
 * @param conn 
 * @returns 
 */
export function createUserMessagesModel(conn: Sequelize, user: typeof User) {
    const TABLE_NAME = "user-messages";
    
    const UserMessagesModel = UserMessages.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
    });
    
    UserMessagesModel.belongsTo(user);
    
    return UserMessagesModel;
}
