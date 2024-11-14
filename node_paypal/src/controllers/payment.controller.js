import { PAYPAL_API, CLIENT_PAYPAL, SECRET_PAYPAL } from "../config.js";
import axios from "axios";

const createOrder = async (req, res) => {
    const { orderBody } = req.body; 
    
    const order = {
        intent: 'CAPTURE',
        purchase_units: orderBody.map((item, index) => {
            return {
                reference_id: `PU_${index + 1}`,
                amount: {
                    currency_code: 'USD',
                    value: `${item.price}`
                }
            };
        }),
        application_context: {
            brand_name: 'Tus Videojuegos.com',
            landing_page: 'NO_PREFERENCE',
            user_action: 'PAY_NOW',
            return_url: 'http://localhost:5173/',
            cancel_url: 'http://localhost:5173/'
        }
    };
    
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const {data} = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
        auth: {
            username: CLIENT_PAYPAL,
            password: SECRET_PAYPAL
        }
    })    

    const {access_token} = data;

    const result = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        }
    })

    console.log(result.data);
    


    res.send({response: 'Order Created'});
    res.status(200);
};

const capturePayment = (req, res) => {
    res.send('Payment Captured');
};

const cancelPayment = (req, res) => {
    res.send('Payment Cancelled');
};

export {
    createOrder,
    capturePayment,
    cancelPayment
};