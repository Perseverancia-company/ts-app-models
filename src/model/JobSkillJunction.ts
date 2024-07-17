import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";
import Skill from "./Skill";
import Job from "./Job";

/**
 * Job skill junction
 */
export default class JobSkillJunction extends Model<
    InferAttributes<
		JobSkillJunction
    >,
    InferCreationAttributes<
		JobSkillJunction,
        { omit: 'id' | 'createdAt' | 'updatedAt' }
    >> {
	declare id: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Job skill junction
 */
export function createJobSkillJunction(
	conn: Sequelize,
	job: typeof Job,
	skill: typeof Skill,
) {
	const TABLE_NAME = "job-skill-junction";
	const Model = JobSkillJunction.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
        tableName: TABLE_NAME,
        modelName: TABLE_NAME,
    });
	
	Model.belongsTo(job);
	Model.belongsTo(skill);
	
	return Model;
}
