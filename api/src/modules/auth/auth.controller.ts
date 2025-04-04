import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private _AuthService_: AuthService) {}

  @Post('sign-in')
  @HttpCode(200)
  async SignIn(
    @Body() body: SignInDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this._AuthService_.SignIn(body, request, response);
  }
}
