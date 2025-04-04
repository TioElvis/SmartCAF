import {
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES,
} from '../../lib/constants';
import { Model } from 'mongoose';
import { Token } from '../../types';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { SignInDto } from './dto/sign-in.dto';
import { InjectModel } from '@nestjs/mongoose';
import { getClientInfo } from '../../lib/utils';
import { User } from '../../schemas/user.schema';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private _JwtService_: JwtService,
    @InjectModel(User.name) private _UserModel_: Model<User>,
  ) {}

  async SignIn(body: SignInDto, request: Request, response: Response) {
    const { email, password } = body;

    const user = await this._UserModel_.findOne({ email });

    if (user === null || compareSync(password, user.password) === false) {
      throw new HttpException('Invalid credentials', 400);
    }

    const { ip_address, user_agent } = getClientInfo(request);

    const payload: Token = {
      user_id: user._id,
      ip_address,
      user_agent,
    };

    try {
      const access_token = await this._JwtService_.signAsync(payload, {
        expiresIn: ACCESS_TOKEN_EXPIRES,
      });

      const refresh_token = await this._JwtService_.signAsync(payload, {
        expiresIn: REFRESH_TOKEN_EXPIRES,
      });

      user.ip_address = ip_address;
      user.user_agent = user_agent;

      await user.save();

      response.cookie('access_token', access_token, {
        httpOnly: true,
        maxAge: ACCESS_TOKEN_EXPIRES,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });

      response.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        maxAge: REFRESH_TOKEN_EXPIRES,
        secure: process.env.NODE_ENV === 'production',
        path: '/auth/refresh-token',
      });

      return 'ok';
    } catch (error) {
      throw new HttpException({ error, text: 'Internal server error' }, 500);
    }
  }
}
