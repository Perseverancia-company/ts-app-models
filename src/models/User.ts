import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

import mysqlConn from "../connection/mysqlConn";

function User() {
    const TABLE_NAME = "user";
    
    const model: any = mysqlConn().define(TABLE_NAME, {
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
    }, {
        tableName: TABLE_NAME,
        hooks: {
            // Before creating the user on the database
            beforeCreate: async function(user: any) {
                // Hash the password
                const salt = await bcrypt.genSalt(10);
                
                console.log(`User password: ${user.password}`);
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
                        
                        // Why would you need to remove confirmed email?
                        // "confirmedEmail",
                        
                        // Not important either
                        // "createdAt",
                        // "updatedAt"
                    ]
                }
            }
        }
    });

    // Personalized methods
    model.prototype.verifyPassword = function(password: string) {
        return bcrypt.compareSync(password, this.password);
    }
    
    return model;
}

export default User;
