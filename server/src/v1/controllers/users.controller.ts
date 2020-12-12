import { BadRequestErrorResponse, NotFoundErrorResponse, ServerErrorResponse } from '../../exceptions';
import { User, UserDocument } from '../models/User';
import services from '../services/users.service';

export const getUser = (req, res, next) => {
  const userId = req.params.id;
  services.getUser(userId)
    .then(userItem => {
      if (userItem === null) {
        return next(new NotFoundErrorResponse());
      }
      res.status(200).json(userItem);
    })
    .catch(error => next(new ServerErrorResponse(error)));
};

export const createUser = (req, res, next) => {
    const user: UserDocument = req.body;
    services.createUser(user)
      .then(user => res.status(201).json(user))
      .catch(error => next(new ServerErrorResponse(error)));
};

export const updateUser = (req, res, next) => {
  const userItemId: string = req.params.id;
  const userUpdate: User = req.body;
  services.updateUser(userItemId, userUpdate)
    .then(question => res.status(200).json(question))
    .catch(error => next(new ServerErrorResponse(error)));
};

export const updateUserScore = (req, res, next) => {
  updateUserField('score', req, res, next);
}

export const updateUserWins = (req, res, next) => {
  updateUserField('wins', req, res, next);
}

export const updateUserLosses = (req, res, next) => {
  updateUserField('losses', req, res, next);
}

export const deleteUser = (req, res, next) => {
    const userItemId: string = req.params.id;
    services.deleteUser(userItemId)
      .then(user => res.status(204))
      .catch(error => next(new ServerErrorResponse(error)));
};

const updateUserField = (prop: string, req, res, next) => {
  const field = req.body[prop];
  if (!field) {
    throw new BadRequestErrorResponse(`'${prop}' must be included in request body.`);
  }

  const userItemId: string = req.params.id;
  let queryUpdate = {};
  queryUpdate[prop] = field;
  services.updateUserField(userItemId, queryUpdate)
    .then(question => res.status(200).json(question))
    .catch(error => next(new ServerErrorResponse(error)));
}

export default {
  getUser,
  createUser,
  updateUser,
  updateUserScore,
  updateUserWins,
  updateUserLosses,
  deleteUser
}