// src/routers/auth.js

import { Router } from 'express';
import {
  loginUserControllers,
  logoutUserControllers,
  refreshUserSessionController,
  registerUsersControllers,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/users.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUsersControllers),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserControllers),
);
router.post('/refresh', ctrlWrapper(refreshUserSessionController));
router.post('/logout', ctrlWrapper(logoutUserControllers));

export default router;
