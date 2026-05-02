import mongoose , {model , Schema} from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.MONGO_URL?.trim();

mongoose.connect(url as string)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB error:", err));

const UserSchema = new Schema({
    username : {type :String, unique: true},
    password : String
})

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
    title : String,
    link : String,
    tags : [{type: mongoose.Types.ObjectId, ref:'Tag'}],
    type: String,
    userId: {type : mongoose.Types.ObjectId, ref: 'User', required : true}


})
export const ContentModel = model("Content" , ContentSchema);

const LinkSchema = new mongoose.Schema({
  hash: String,
  userId: mongoose.Types.ObjectId,
  contentIds: [{ type: mongoose.Types.ObjectId, ref: "Content" }]
});

export const LinkModel = model("Link" , LinkSchema);