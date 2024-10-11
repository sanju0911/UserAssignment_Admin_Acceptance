const mongoDB = require("mongoose");

const AccountSchema = new mongoDB.Schema({
  userAlias: { type: String, required: true, unique: true },
  passKey: { type: String, required: true },
  accountType: { type: String, enum: ["user", "admin"], required: true },
});

module.exports = mongoDB.model("Account", AccountSchema);
