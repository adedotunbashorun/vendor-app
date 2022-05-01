import { Module } from '@nestjs/common';
import { DepositsController } from '@vendor-app/deposits/controllers/deposits.controller';
import { DepositsService } from '@vendor-app/deposits/services/deposits.service';

@Module({
  controllers: [DepositsController],
  providers: [DepositsService],
})
export class DepositsModule {}
