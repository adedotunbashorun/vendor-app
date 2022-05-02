import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { MongooseModelModule } from '@vendor-app/core/mongooseModels.module';

@Module({
  imports: [MongooseModelModule],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
