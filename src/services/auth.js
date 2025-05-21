// srs/services/users.js

import createHttpError from 'http-errors';
import { usersCollection } from '../db/models/users.js';
import { sessionCollection } from '../db//models//session.js';
import bcrypt from 'bcrypt';
import { FIFTEEN_MINUTES, THIRTY_DAY } from '../constants/constants.js';
import { randomBytes } from 'crypto';

export const registerUsers = async (payload) => {
  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  const user = await usersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  return await usersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await usersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(401, 'User not found');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await sessionCollection.deleteOne({ userId: user._id });

  const accesToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await sessionCollection.create({
    userId: user._id,
    accesToken,
    refreshToken,
    accesTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAY),
  });
};

export const logoutUser = async (sessionId) => {
  await sessionCollection.deleteOne({ _id: sessionId });
};
