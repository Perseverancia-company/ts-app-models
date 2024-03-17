import { DataTypes } from "sequelize";

import MSQLDC_FetchENV from "../../connection/MSQLDC_FetchENV";
import Property from "./Property";

const Price = MSQLDC_FetchENV().define("price", {
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    tableName: "price",
});

Property.belongsTo(Price);

export default Price;
