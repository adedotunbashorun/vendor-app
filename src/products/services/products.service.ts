import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SCHEMAS } from '@vendor-app/core/constants';
import PaginationQuery from '@vendor-app/core/input/pagination-query.input';
import { Product } from '@vendor-app/products/schema/products/product.schema';
import { User } from '@vendor-app/users/schema/users/user.schema';
import { Document, Model, PaginateModel } from 'mongoose';
import CreateProductInput from '../input/createProduct.input';

type ProductModel<T extends Document> = PaginateModel<T>;
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(SCHEMAS.PRODUCT) private productModel: Model<Product>,
    @InjectModel(SCHEMAS.PRODUCT)
    readonly PaginatedProduct: ProductModel<Product>,
  ) {}

  /**
   * Get all product paginated data
   * @param user
   * @param data
   */
  async index(user: User, data: PaginationQuery): Promise<any> {
    const customLabels = {
      docs: 'nodes',
      page: 'currentPage',
      totalPages: 'pageCount',
      limit: 'perPage',
      totalDocs: 'itemCount',
    };

    let query = {};
    if (user.id) query = { sellerId: user.id };

    return await this.PaginatedProduct.paginate(query, {
      customLabels,
      ...data,
    });
  }

  async store(user: User, input: CreateProductInput): Promise<Product> {
    return this.productModel.create({
      ...input,
      sellerId: user.id,
    });
  }

  async view(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }

  async update(id: string, input: CreateProductInput): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, input, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.productModel.findOneAndRemove({ id });
  }
}
