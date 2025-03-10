// srs/validation/contacts.js

import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(12)
    .max(12)
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required(),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal')
    .required(),
});

export const upserContactSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(12)
    .max(12),
  email: Joi.string().email({ tlds: { allow: true } }),
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal'),
});
