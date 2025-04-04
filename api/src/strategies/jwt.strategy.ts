import { Request } from 'express';
import { Cookies, Token } from '../types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private _UserService_: UserService,
    private _ConfigService_: ConfigService,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: _ConfigService_.get<string>('JWT_SECRET')!,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return (request.cookies as Cookies).access_token ?? '';
        },
      ]),
    });
  }

  async validate(payload: Token) {
    const user = await this._UserService_.FindById(payload.user_id, {
      password: false,
    });

    if (
      payload.ip_address !== user.ip_address ||
      payload.user_agent !== user.user_agent
    ) {
      return false;
    }

    return user;
  }
}
