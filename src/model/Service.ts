import { Model, InferCreationAttributes, InferAttributes, Sequelize, DataTypes } from "sequelize";

/**
 * Service model
 */
export default class Service extends Model<
    InferAttributes<Service>,
    InferCreationAttributes<Service, { omit: 'id' | 'createdAt' | 'updatedAt' }>
> {
    declare id: number;
    declare name: string;
    declare description: string;
    declare price: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}

/**
 * Service model
 */
export function createServiceModel(conn: Sequelize) {
    const ServiceModel = Service.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize: conn,
    });

    return ServiceModel;
}
