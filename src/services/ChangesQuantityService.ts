import { getCustomRepository } from 'typeorm';
import Product from '../models/Product';
import ProductsRepository from '../repositories/ProductsRepository';

interface Request {
  id: string;
  new_quantity: number;
}

class ChangesQuantityService {
  public async execute({ id, new_quantity }: Request): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne({ where: { id } });

    if (!product) throw new Error('Product not found');

    // if (new_quantity <= product.minimum_quantity) {
    //   throw new Error('Minimum quantity not allowed');
    // }

    // if (product.current_quantity === 0) {
    //   throw new Error('Quantity not allowed');
    // }

    if (new_quantity < 0) {
      throw new Error('Quantity not allowed');
    }

    // console.log('valor novo', new_quantity);
    // console.log('valor antigo', product.current_quantity);

    await productsRepository.update(product.id, {
      current_quantity: new_quantity,
    });

    product.current_quantity = new_quantity;
    const newProduct = product;

    return newProduct;
  }
}

export default ChangesQuantityService;
