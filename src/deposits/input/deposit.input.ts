import { IsInt, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class DepositInput {
  @ApiProperty()
  @IsInt()
  @IsEnum([5, 10, 20, 50, 100])
  deposit: number;
}
