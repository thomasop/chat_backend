import Message from "./Message";
import User from "./User";
import Conversation from "./Conversation";

Conversation.hasOne(Message, {
  foreignKey: "conversationId",
});
Message.belongsTo(Conversation);

User.hasMany(Message, {
  foreignKey: "userId",
});
Message.belongsTo(User);

User.hasMany(Conversation, {
  foreignKey: "userOneId",
});
Conversation.belongsTo(User, {
  foreignKey: "userOneId",
  as: "userOneAsId",
});

User.hasMany(Conversation, {
  foreignKey: "userTwoId",
});
Conversation.belongsTo(User, {
  foreignKey: "userTwoId",
  as: "userTwoAsId",
});

export { Conversation, Message, User };
