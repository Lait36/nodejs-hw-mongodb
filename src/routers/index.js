import { Router } from "express";
import contactsRoter from './contacts.js';
import authRoter from './auth.js';

const router = Router();

router.use('/contacts', contactsRoter);
router.use('/auth', authRoter);

export default router;