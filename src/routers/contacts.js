// srs/routers/contacts.js

import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactsByIdControllers,
  getContactsControllers,
  upsertStudentController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  upserContactSchema,
} from '../validation/contacts.js';
import { isValiId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsControllers));

router.get(
  '/contacts/:contactId',
  isValiId,
  ctrlWrapper(getContactsByIdControllers),
);

router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete(
  '/contacts/:contactId',
  isValiId,
  ctrlWrapper(deleteContactController),
);

router.patch(
  '/contacts/:contactId',
  isValiId,
  validateBody(upserContactSchema),
  ctrlWrapper(upsertStudentController),
);
export default router;

// Sample Request Bodies
/* 
  {
   "name": "Jane Smith",
   "phoneNumber": "+380994752863",
   "email": "jane.smith@example.com",
   "isFavourite": true,
   "contactType": "home"
  }
*/
