import { Document, Model, model, Schema } from 'mongoose';

export interface User {
  username: string;
  wins: Number;
  losses: Number;
  score: Number;
}
export interface UserDocument extends User, Document {}
export interface UserModel extends Model<UserDocument> {}

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  wins: {
    type: Number,
    default: 0,
    validate: (val) => val >= 0
  },
  losses: {
    type: Number,
    default: 0,
    validate: (val) => val >= 0
  },
  score: {
    type: Number,
    default: 0,
    validate: (val) => val >= 0
  }
});

export default model<UserDocument, UserModel>('User', UserSchema);