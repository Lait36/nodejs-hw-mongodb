// srs/services/users.js

import createHttpError from 'http-errors';
import { usersCollection } from '../db/models/users.js';
import { sessionCollection } from '../db//models//session.js';
import bcrypt from 'bcrypt';
import { FIFTEEN_MINUTES, THIRTY_DAY } from '../constants/constants.js';
import { randomBytes } from 'crypto';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAY),
  };
};

export const registerUsers = async (payload) => {
  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  const user = await usersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');
  delete payload.password;
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

  const session = createSession();

  return await sessionCollection.create({
    userId: user._id,
    ...session,
  });
};

export const logoutUser = async (sessionId) => {
  await sessionCollection.deleteOne({ _id: sessionId });
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await sessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Sesssion not found');
  }

  const isSessionTokenExpride =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpride) {
    throw createHttpError(401, 'Session toke expride');
  }

  const newSession = createSession();

  await sessionCollection.deleteOne({ _id: sessionId, refreshToken });

  return sessionCollection.create({ userId: session.userId, ...newSession });
};
