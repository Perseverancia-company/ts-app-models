import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";

/**
 * Skill
 * 
 * Skills are just to name them this model doesn't track anything else.
 */
export default class Skill extends Model<
    InferAttributes<
        Skill
    >,
    InferCreationAttributes<
        Skill,
        { omit: 'id' | 'createdAt' | 'updatedAt' }
    >> {
    declare id: number;
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Create skill model
 */
export function createSkillModel(conn: Sequelize) {
    const TABLE_NAME = "skill";
        
    const Model = Skill.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(128),
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
