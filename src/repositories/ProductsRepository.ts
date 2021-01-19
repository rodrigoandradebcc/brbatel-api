import { EntityRepository, Repository } from 'typeorm';
import Product from '../models/Product';

@EntityRepository(Product)
class ProductsRepository extends Repository<Product> {}

export default ProductsRepository;
