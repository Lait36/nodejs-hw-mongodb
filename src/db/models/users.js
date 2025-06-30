// srs/db/models/user.js

import { Schema, model } from 'mongoose';
const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.method('toJSON', function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
});

export const usersCollection = model('users', usersSchema);

// Створіть модель Session з такими полями:

// userId - string, required
// accessToken - string, required
// refreshToken - string, required
// accessTokenValidUntil - Date, required
// refreshTokenValidUntil - Date, required
