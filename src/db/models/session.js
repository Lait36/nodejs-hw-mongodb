// srs/db/models/session.js

import { model, Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    accesToken: { type: String, require: true },
    refreshToken: { type: String, require: true },
    accesTokenValidUntil: { type: Date, require: true },
    refreshTokenValidUntil: { type: Date, require: true },
  },
  { timestamps: true, versionKey: false },
);

export const sessionCollection = model('session', sessionSchema);
