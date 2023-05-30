import Message from "./Message.js";
import Participant from "./Participant.js";
import User from "./User.js";
import Conversation from "./Conversation.js";
Conversation.hasMany(Message, {
    foreignKey: 'conversationId'
});
Message.belongsTo(Conversation);
User.hasMany(Message, {
    foreignKey: 'userId'
});
Message.belongsTo(User);
User.belongsToMany(Conversation, { through: Participant, as: 'Conversation' });
Conversation.belongsToMany(User, { through: Participant, as: 'User' });
export { Conversation, Message, User, Participant };
