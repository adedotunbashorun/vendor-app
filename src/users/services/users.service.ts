import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { SCHEMAS } from '@vendor-app/core/constants';
import { User } from '../schema/users/user.schema';
import CreateUserInput from '../input/createUser.input';
import UpdateUserInput from '../input/updateUser.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(SCHEMAS.USER) private UserModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * Validate the users credentials.
   *
   * This is useful for the login.
   *
   * @todo update the default return.
   *
   * @param email
   * @param password
   * @constructor
   */
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.UserModel.findOne({ email })
      .select('+password')
      .exec();
    // Check if password is correct
    if (!user) {
      throw new NotFoundException('user with this details do not exist.');
    }

    if (bcrypt.compareSync(password, user.password)) {
      if (user.isActive) {
        throw new NotFoundException(
          'There is already an active session using your account.',
        );
      }
      user.isActive = true;
      return user.save();
    }

    throw new NotFoundException(
      'Invalid Password, Please enter the correct password.',
    );
  }

  /**
   * Register a new user.
   *
   * @param payload
   */
  public async registerUser(payload: CreateUserInput): Promise<any> {
    try {
      payload.password = bcrypt.hashSync(payload.password, 10);

      const user: User = new this.UserModel(payload);
      await user.save();

      return {
        userId: user._id,
        isSeller: user.role === 'seller' ? true : false,
      };
    } catch (error) {
      // @todo improve on the error handling. Return exact field with the error
      if ('code' in error && error.code === 11000) {
        return {
          message: 'The user already exists',
          code: error.code,
        };
      }
      return {
        ...error,
      };
    }
  }

  /**
   * Sign in a new user
   *
   * @todo we should a different key for the refresh token jwt
   * @param user
   */
  async login(user: User): Promise<any> {
    const payload = {
      id: user.id,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: 3000 }),
    };
  }

  /**
   * Get application roles.
   *
   * @todo Integrate with the roles guard.
   */
  async getUserByKey(key: string, value: string): Promise<any> {
    const check = await this.UserModel.findOne({ [key]: value });

    return check;
  }

  /**
   * Get user
   * @param user
   */
  async getUser(user: User): Promise<User> {
    return await this.UserModel.findById(user.id).select('+password');
  }

  /**
   * Get user
   * @param user
   */
  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    return this.UserModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async logoutAll(id: string): Promise<number> {
    await this.UserModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    ).exec();

    return HttpStatus.OK;
  }
}
