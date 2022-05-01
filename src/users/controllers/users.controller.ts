import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import CreateUserInput from '../input/createUser.input';
import { User } from '../schema/users/user.schema';
import { CurrentUser } from '../users.decorators';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly auth: UsersService) {}

  /**
   * Login a user using the email/password combination
   */
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiResponse({ status: 201, description: 'user logged in.' })
  @ApiResponse({ status: 401, description: 'unauthorized.' })
  async login(@Req() request: Request): Promise<any> {
    return this.auth.login(request.user);
  }

  /**
   * Register a new user.
   */
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('register')
  @ApiResponse({ status: 201, description: 'user created.' })
  @ApiResponse({ status: 401, description: 'unauthorized.' })
  async register(@Body() input: CreateUserInput): Promise<User> {
    return this.auth.registerUser(input);
  }

  /**
   * Generate a refresh token
   * @param request
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('token')
  @ApiResponse({ status: 201, description: 'refresh token.' })
  @ApiResponse({ status: 401, description: 'unauthorized.' })
  async refreshAccessToken(@Req() request: Request): Promise<any> {
    return this.auth.refreshAccessToken(request);
  }

  /**
   * Get currently authenticated user
   * @param resp
   * @param user
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiResponse({ status: 201, description: 'current user data.' })
  @ApiResponse({ status: 401, description: 'unauthorized.' })
  async me(@CurrentUser() user: User): Promise<{ user: User }> {
    const currentUser = await this.auth.getUser(user);
    return {
      user: currentUser,
    };
  }
}
