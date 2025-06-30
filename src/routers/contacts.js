// srs/routers/contacts.js

import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactsByIdControllers,
  getContactsControllers,
  upsertContactsController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  upserContactSchema,
} from '../validation/contacts.js';
import { isValiId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
router.use(authenticate);

router.get('/', ctrlWrapper(getContactsControllers));

router.get('/:contactId', isValiId, ctrlWrapper(getContactsByIdControllers));

router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete('/:contactId', isValiId, ctrlWrapper(deleteContactController));

router.patch(
  '/:contactId',
  isValiId,
  validateBody(upserContactSchema),
  ctrlWrapper(upsertContactsController),
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
