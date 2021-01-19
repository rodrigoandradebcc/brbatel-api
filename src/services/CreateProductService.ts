import { getCustomRepository } from 'typeorm';
import Product from '../models/Product';
import ProductsRepository from '../repositories/ProductsRepository';

interface Request {
  name: string;
  current_quantity: number;
  minimum_quantity: number;
  cost: number;
  resale_price: number;
}

class CreateUserService {
  public async execute({
    name,
    current_quantity,
    minimum_quantity,
    cost,
    resale_price,
  }: Request): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = productsRepository.create({
      name,
      current_quantity,
      minimum_quantity,
      cost,
      resale_price,
    });

    await productsRepository.save(product);
    return product;
  }
}

export default CreateUserService;
