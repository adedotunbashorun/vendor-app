import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userModels } from '@vendor-app/users/schema/users';

const Models = MongooseModule.forFeature([...userModels]);

@Module({
  imports: [Models],
  exports: [Models],
})
export class MongooseModelModule {}
