// src/services/users.js

import { registerUsers } from '../services/users.js';

export const registerUsersControllers = async (req, res) => {
  const user = await registerUsers(req.body);


  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};
