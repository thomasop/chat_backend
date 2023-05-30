import { DataTypes } from "sequelize";
import connect from "../database/connect.js";
const Conversation = connect.define('conversation', {
    id: {
        type: DataTypes.UUID,
        autoIncrement: true,
        primaryKey: true
    },
    last_message_id: {
        type: DataTypes.UUID,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
});
export default Conversation;
