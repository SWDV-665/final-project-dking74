import { UpdateUserFields } from '../../types';
import UserModel, { User, UserDocument } from '../models/User';

export const getUser = (id: string) => {
  return UserModel.find({ _id: id }).exec();
};

export const createUser = (user: UserDocument) => {
  return UserModel.create(user);
};

export const updateUser = (id: string, updatedUser: User) => {
  return UserModel.updateOne({ _id: id }, updatedUser);
};

export const updateUserField = (id: string, userFields: UpdateUserFields) => {
  let query = {};
  if (userFields.score) query['score'] = userFields.score;
  else if (userFields.wins) query['wins'] = userFields.wins;
  else if (userFields.losses) query['losses'] = userFields.losses;

  return UserModel.findOneAndUpdate({ _id: id }, { $inc: query });
}

export const deleteUser = (id: string) => {
  return UserModel.deleteOne({ _id: id});
}

export default {
  getUser,
  createUser,
  updateUser,
  updateUserField,
  deleteUser
}