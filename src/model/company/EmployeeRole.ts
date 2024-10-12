import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";

/**
 * Employee role
 */
export default class EmployeeRole extends Model<
    InferAttributes<
		EmployeeRole
    >,
    InferCreationAttributes<
		EmployeeRole,
        { omit: 'id' | 'createdAt' | 'updatedAt' }
    >> {
	declare id: number;
	declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Employee role model
 */
export function createEmployeeRoleModel(
	conn: Sequelize,
) {
	const TABLE_NAME = "employee-role";
	const Model = EmployeeRole.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
		// Accountant, Lawyer, IT, etc.
		name: {
			type: DataTypes.STRING(256),
			allowNull: false,
		},
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
    });
	
	return Model;
}
