import { IsInt, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class DepositInput {
  @ApiProperty()
  @IsInt()
  @IsEnum([5, 10, 20, 50, 100], {
    message: 'The deposit can only be one of 5,10,20,50,100 coins',
  })
  deposit: number;
}
