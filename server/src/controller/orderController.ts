import { Request, Response, Router } from 'express';
import { OrderService } from '../services/order.service';
import { OrderDTO, OrderDetailDTO } from '../dto/order.dto';

const orderService = new OrderService();
const router = Router();

// POST: Create a new order
router.post('/createOrder', async (req: Request, res: Response) => {
    try {
        const { userId, totalAmount, status, orderDetails } = req.body;

        const orderData: OrderDTO = { userId, totalAmount, status };
        const orderDetailsData: OrderDetailDTO[] = orderDetails;

        const newOrder = await orderService.createOrder(orderData, orderDetailsData);

        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order' });
    }
});

export default router;
