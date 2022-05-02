import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { MongooseModelModule } from '@vendor-app/core/mongooseModels.module';
import { DepositsModule } from '@vendor-app/deposits/deposits.module';

@Module({
  imports: [MongooseModelModule, DepositsModule],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
