import { Module } from '@nestjs/common';
import { UsersService } from '@vendor-app/users/services/users.service';
import { UsersController } from '@vendor-app/users/controllers/users.controller';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
