// srs/controllers/users.js

import { THIRTY_DAY } from '../constants/constants.js';
import { loginUser, logoutUser, registerUsers } from '../services/auth.js';

export const registerUsersControllers = async (req, res) => {
  const user = await registerUsers(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserControllers = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAY),
  });

  res.status(200).json({
    status: 200,
    message: 'Login successful',
    data: { accesToken: session.accesToken },
  });
};

export const logoutUserControllers = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(200).send();
};
