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

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsControllers));
router.get('/contacts/:contactId', ctrlWrapper(getContactsByIdControllers));

router.post('/contacts', ctrlWrapper(createContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

router.patch('/contacts/:contactId', ctrlWrapper(upsertStudentController));
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
