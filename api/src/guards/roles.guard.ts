import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private _Reflector_: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles = this._Reflector_.get<string[]>('roles', context.getHandler());

    if (roles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return roles.includes((user as User).role);
  }
}

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
