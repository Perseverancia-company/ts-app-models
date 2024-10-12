import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import User from "../user/User";
import Company from "./Company";
import EmployeeRole from "./EmployeeRole";

/**
 * Company staff
 */
export default class CompanyStaff extends Model<
    InferAttributes<
		CompanyStaff
    >,
    InferCreationAttributes<
		CompanyStaff,
        { omit: 'id' | 'startedAt' | 'until' | 'createdAt' | 'updatedAt' }
    >> {
	declare id: number;
	declare startedAt: Date;
	declare until: Date;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Create company staff model
 * 
 * M:N Relationship between user and company
 */
export function createCompanyStaffModel(
	conn: Sequelize,
	user: typeof User,
	employeeRole: typeof EmployeeRole,
	company: typeof Company,
) {
	const TABLE_NAME = "company-staff";
	const Model = CompanyStaff.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
		startedAt: DataTypes.DATE,
		until: DataTypes.DATE,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
    });
	
	Model.belongsTo(user);
	Model.belongsTo(employeeRole);
	Model.belongsTo(company);
	
	return Model;
}
