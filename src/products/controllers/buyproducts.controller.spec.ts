import { Test, TestingModule } from '@nestjs/testing';
import { BuyproductsController } from './buyproducts.controller';

describe('BuyproductsController', () => {
  let controller: BuyproductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuyproductsController],
    }).compile();

    controller = module.get<BuyproductsController>(BuyproductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
