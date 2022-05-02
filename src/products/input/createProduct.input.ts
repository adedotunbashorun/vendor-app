import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateProductInput {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  cost: number;
}
