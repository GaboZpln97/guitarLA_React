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

router.get('/capture-payment', function(req, res){
    capturePayment(req, res);
});

router.get('/cancel-payment', function(req, res){
    cancelPayment(req, res);
});

export default router;