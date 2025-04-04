import { Types } from 'mongoose';

export interface Token {
  user_id: Types.ObjectId;
  ip_address: string;
  user_agent: string;
  iat?: number;
  exp?: number;
}

export interface Cookies {
  access_token: string | undefined;
  refresh_token: string | undefined;
}
