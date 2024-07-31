import { Test, TestingModule } from '@nestjs/testing';
import { ProductLikesController } from './product-likes.controller';

describe('ProductLikesController', () => {
  let controller: ProductLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductLikesController],
    }).compile();

    controller = module.get<ProductLikesController>(ProductLikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
