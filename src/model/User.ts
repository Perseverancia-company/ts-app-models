import { Model, InferCreationAttributes, InferAttributes, ModelStatic, Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

/**
 * User model
 */
export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string;
    declare token: string;
    declare confirmedEmail: boolean;
    declare createdAt: Date;
    declare updatedAt: Date;
    
    /**
     * Validate user password
     * 
     * @param password 
     * @returns 
     */
    validatePassword(password: string) {
        return bcrypt.compareSync(password, this.password);
    }
    
    /**
     * Validate password alias
     */
    verifyPassword(password: string) {
        return this.validatePassword(password);
    }
}

/**
 * Initialize user model
 * 
 * @param conn 
 * @returns 
 */
export function createUserModel(conn: Sequelize) {
    const TABLE_NAME = "user";
    
    const UserModel = User.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: DataTypes.STRING,
        confirmedEmail: DataTypes.BOOLEAN,
        // If you don't put these it's gonna give you a big fat error
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        hooks: {
            // Before creating the user on the database
            beforeCreate: async function(user: any) {
                // Hash the password
                const salt = await bcrypt.genSalt(10);
                
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        scopes: {
            // Should be called something else like
            // 'frontend'
            deletePassword: {
                attributes: {
                    exclude: [
                        "password",
                        "token",
                    ]
                }
            }
        }
    });
    
    return UserModel;
}
