import { DataTypes } from "sequelize";

import MSQLDC_FetchENV from "../../connection/MSQLDC_FetchENV";
import Property from "./Property";

const Category = MSQLDC_FetchENV().define("category", {
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    tableName: "category",
});

Property.belongsTo(Category);

export default Category;
