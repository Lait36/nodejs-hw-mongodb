// srs/controllers/users.js

import { THIRTY_DAY } from '../constants/constants.js';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUsers,
} from '../services/auth.js';

const setupSession = async (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAY),
  });
  res.cookie('sessionId', session._id.toString(), {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAY),
  });
};

export const registerUsersControllers = async (req, res) => {
  const user = await registerUsers(req.body);
  delete user.password;
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserControllers = async (req, res) => {
  const session = await loginUser(req.body);

  // res.cookie('refreshToken', session.refreshToken, {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + THIRTY_DAY),
  // });
  // res.cookie('sessionId', session._id.toString(), {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + THIRTY_DAY),
  // });

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Login successful',
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserControllers = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });
  setupSession(res, session);
  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    accessToken: session.accessToken,
  });
};
