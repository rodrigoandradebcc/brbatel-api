import { getCustomRepository } from 'typeorm';
import Product from '../models/Product';

import ProductsRepository from '../repositories/ProductsRepository';

interface Request {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: Request): Promise<void> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new Error('Product does not exist');
    }

    await productsRepository.delete(product.id);
  }
}

export default DeleteProductService;
