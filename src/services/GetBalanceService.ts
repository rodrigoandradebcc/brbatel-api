import Product from '../models/Product';

interface IBalance {
  totalProducts: number;
  grossProfit: number;
}

class GetBalanceService {
  public async execute(products: Product[]): Promise<IBalance> {
    const totalProducts = products.reduce(
      (total, product) => total + product.current_quantity,
      0,
    );

    const totalRevenue = products.reduce(
      (total, product) =>
        total + product.resale_price * product.current_quantity,
      0,
    );

    const totalCost = products.reduce(
      (total, product) => total + product.current_quantity * product.cost,
      0,
    );

    const gross = Number((totalRevenue - totalCost).toFixed(2));

    return {
      totalProducts,
      grossProfit: gross,
    };
  }
}

export default GetBalanceService;
