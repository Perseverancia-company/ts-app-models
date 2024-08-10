import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";

/**
 * Byte region
 * 
 * Used to flag regions of bytes in a file, it's used in a private repository.
 */
export default class ByteRegion extends Model<
    InferAttributes<
		ByteRegion
    >,
    InferCreationAttributes<
		ByteRegion,
        { omit: "id" | 'createdAt' | 'updatedAt' }
    >> {
	declare id: number;
	declare start: number;
	declare size: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Byte region model
 */
export function createByteRegionModel(
	conn: Sequelize
) {
	const TABLE_NAME = "byte-region";
	
	const Model = ByteRegion.init({
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		start: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		size: {
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
	
	return Model;
}
