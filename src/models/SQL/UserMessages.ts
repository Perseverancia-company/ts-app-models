import { DataTypes } from "sequelize";

import MSQLDC_FetchENV from "../../connection/MSQLDC_FetchENV";
import User from "./User";

const UserMessages = MSQLDC_FetchENV().define("user-messages", {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "user-messages",
});

UserMessages.belongsTo(User);

export default UserMessages;
