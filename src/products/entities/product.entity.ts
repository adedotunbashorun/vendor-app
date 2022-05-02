import {
  IsArray,
  IsInt,
  IsString,
  IsMongoId,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PurchasedItem {
  @ApiProperty()
  @ApiProperty()
  @IsMongoId({ message: 'Invalid ID specified' })
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsInt()
  cost: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  quantity: number;
}
