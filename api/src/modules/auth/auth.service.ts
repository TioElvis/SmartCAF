import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private _UserModel_: Model<User>) {}
}
