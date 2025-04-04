import { Router } from "express";
import contactsRoter from './contacts.js';
import authRoter from './auth.js';

const router = Router();

router.use('/contacts', contactsRoter);
router.use('/register', authRoter);

export default router;