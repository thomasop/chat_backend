import connect from "../database/connect.js";
import { DataType } from "sequelize-typescript";
const User = connect.define('user', {
    id: {
        type: DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: {
        type: DataType.TEXT
    },
    lastname: {
        type: DataType.TEXT
    },
    mail: {
        type: DataType.TEXT
    },
    password: {
        type: DataType.TEXT
    },
    status: {
        type: DataType.BOOLEAN
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    timestamps: false
});
export default User;
