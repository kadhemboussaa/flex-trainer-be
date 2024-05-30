import { userDocument } from 'src/schema/user.schema';

export type AuthReponse = {
  token: string;
  user: userDocument;
};
