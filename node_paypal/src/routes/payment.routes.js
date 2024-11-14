import { Router } from "express";
import{
    createOrder,
    capturePayment,
    cancelPayment
} from '../controllers/payment.controller.js';


const router = Router();

router.post('/create-order', function(req, res){
    createOrder(req, res);
});

router.get('/capture-payment', capturePayment);

router.get('/cancel-payment', cancelPayment);

export default router;