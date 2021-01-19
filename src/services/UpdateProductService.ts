import { getCustomRepository } from 'typeorm';
import Product from '../models/Product';
import ProductsRepository from '../repositories/ProductsRepository';

interface Request {
  id: string;
  name: string;
  current_quantity: number;
  minimum_quantity: number;
  cost: number;
  resale_price: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    current_quantity,
    minimum_quantity,
    cost,
    resale_price,
  }: Request): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new Error('Product does not exist');
    }

    if (current_quantity < 0) {
      // throw new Error('Amount must be greater than zero');
      throw new Error('Quantidade não pode ser menor que zero');
    }

    productsRepository.merge(product, {
      name,
      current_quantity,
      minimum_quantity,
      cost,
      resale_price,
    });

    const result = await productsRepository.save(product);
    return result;
  }
}

export default UpdateProductService;
