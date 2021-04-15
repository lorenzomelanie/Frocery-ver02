import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/frocery_db', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

// app.get('/api/products/:id', (req, res) => {
// 	const product = data.products.find((x) => x._id === req.params.id);
// 	if (product) {
// 		res.send(product);
// 	} else {
// 		res.status(404).send({ message: 'Product Not Found' });
// 	}
// });
// app.get('/api/products', (req, res) => {
// 	res.send(data.products);
// });
app.get('/', (req, res) => {
	res.send('Server is ready');
});
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('api/orders', orderRouter);
app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message });
});

app.listen(port, () => {
	console.log(`Server at http://localhost:${port}`);
});
