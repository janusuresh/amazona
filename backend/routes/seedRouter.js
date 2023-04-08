import express from 'express';
import data from '../data.js';
import Product from '../Model/productModel.js';
import User from '../Model/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async(req, res) => {
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdProducts, createdUsers });
});

export default seedRouter;