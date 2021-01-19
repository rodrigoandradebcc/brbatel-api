/* eslint-disable no-shadow */
import { request, response, Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ProductsRepository from '../repositories/ProductsRepository';
import ChangesQuantityService from '../services/ChangesQuantityService';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import GetBalanceService from '../services/GetBalanceService';
import UpdateProductService from '../services/UpdateProductService';

const productsRouter = Router();

productsRouter.get('/', async (request, response) => {
  const productsRepository = getCustomRepository(ProductsRepository);
  const products = await productsRepository.find();

  return response.json(products);
});

productsRouter.get('/balance', async (request, response) => {
  const productsRepository = getCustomRepository(ProductsRepository);
  const products = await productsRepository.find();
  const getBalance = new GetBalanceService();
  const balance = await getBalance.execute(products);

  return response.json({ balance });
});

productsRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({ id });

    return response.status(204).send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

productsRouter.post('/', async (request, response) => {
  try {
    const {
      name,
      current_quantity,
      minimum_quantity,
      cost,
      resale_price,
    } = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      name,
      current_quantity,
      minimum_quantity,
      cost,
      resale_price,
    });

    return response.json(product);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

productsRouter.patch('/:id', async (request, response) => {
  try {
    const { new_quantity } = request.body;
    const { id } = request.params;

    const changeQuantity = new ChangesQuantityService();

    const newProduct = await changeQuantity.execute({
      id,
      new_quantity,
    });

    return response.json(newProduct);
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

productsRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const {
      name,
      current_quantity,
      minimum_quantity,
      cost,
      resale_price,
    } = request.body;
    const updateProduct = new UpdateProductService();
    const newProduct = await updateProduct.execute({
      id,
      name,
      current_quantity,
      minimum_quantity,
      cost,
      resale_price,
    });

    return response.json(newProduct);
  } catch (err) {
    // console.log('Erro', err.message);
    return response.status(400).json({ error: err.message });
  }
});

export default productsRouter;
