import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class BuyProductInput {
  @ApiProperty()
  @IsArray()
  products: [];
}
