// srs/services/users.js

import createHttpError from 'http-errors';
import { usersCollection } from '../db/models/users.js';
import bcrypt from 'bcrypt';

export const registerUsers = async (payload) => {
  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  const user = await usersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  return await usersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};
