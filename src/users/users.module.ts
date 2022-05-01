import { Module } from '@nestjs/common';
import { UsersService } from '@vendor-app/users/services/users.service';
import { UsersController } from '@vendor-app/users/controllers/users.controller';
import { MongooseModelModule } from '@vendor-app/core/mongooseModels.module';

@Module({
  imports: [MongooseModelModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
