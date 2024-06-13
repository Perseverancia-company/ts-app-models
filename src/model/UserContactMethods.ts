import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import User from "./User";

/**
 * 
 */
export default class UserContactMethods extends Model<
    InferAttributes<
        UserContactMethods
    >,
    InferCreationAttributes<
        UserContactMethods,
        { omit: 'id' | 'email' | 'phoneNumber' | 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
    declare email: string;
    declare phoneNumber: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * User contact methods
 * 
 * Most people primary email will be hidden, this is where they can put a public one, or a phone number.
 */
export function createUserContactMethods(conn: Sequelize, user: typeof User) {
    const TABLE_NAME = "user-contact-methods";
        
    const UserContactMethodsModel = UserContactMethods.init({
        id: { 
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        email: {
            type: DataTypes.STRING(128),
        },
        phoneNumber: {
            type: DataTypes.STRING(128),
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
    });
    
    // Relations
    UserContactMethodsModel.belongsTo(user);
    
    // // Relations
    // Model.belongsTo(this.user, {
    //     foreignKey: "userId",
    // });
    
    return UserContactMethodsModel;
}
