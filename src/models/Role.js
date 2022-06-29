import { Schema, model } from "mongoose";

export const Role = ["user", "admin", "moderator"]

const rolSchema = new Schema({
  name: String
},
{
  versionKey: false
})

export default model('Role', rolSchema);