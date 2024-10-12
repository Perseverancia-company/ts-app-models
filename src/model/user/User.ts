import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import Role from "./Role";

/**
 * User model
 */
export default class User extends Model<
    InferAttributes<
        User
    >,
    InferCreationAttributes<
        User,
        { omit: 'id' | "surname" | 'confirmedEmail' |
			'createdAt' | 'updatedAt' | 'token' | "expires" | "pfp" }
    >> {
    declare id: number;
    declare name: string;
	declare surname: string;
    declare email: string;
    declare password: string;
    declare confirmedEmail: boolean;
    declare token: string;
	declare expires: Date;
	declare pfp: string;
	
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
 * Create user model
 * 
 * @param conn 
 * @returns 
 */
export function createUserModel(conn: Sequelize, role: typeof Role) {
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
		// Surname is optional
		surname: {
            type: DataTypes.STRING,
		},
        email: {
            type: DataTypes.STRING,
            allowNull: false,
			// Validate uniqueness
			unique: true,
			validate: {
				isEmail: {
					msg: "Email is incorrect",
				}
			},
        },
        password: {
            type: DataTypes.STRING(64),
            allowNull: false,
			validate: {
				notEmpty: {
					msg: "Password cannot be empty"
				}
			}
        },
        confirmedEmail: DataTypes.BOOLEAN,
        token: DataTypes.STRING,
		expires: {
			type: DataTypes.DATE
		},
		// PFP will be the name of the image only, the path is calculated elsewhere
		pfp: {
			type: DataTypes.STRING(64),
		},
        // If you don't put these it's gonna give you a big fat error
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
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
        },
    });
	
	// User roles
	UserModel.belongsToMany(Role, { through: 'user-roles' });
	Role.belongsToMany(UserModel, { through: 'user-roles' });
    
    return UserModel;
}
