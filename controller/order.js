const url = require('url');
const Order = require('../model/order')

module.exports = {
    createOrder: async (req, res, next) => {
        try {
            const { 
                order_from,
                delivery_date,
                customer_name,
                customer_phone,
                customer_city,
                pincode,
                customer_area,
                customer_address,
                isPaid,
                amount,
                delivery_agent_id,
                delivery_boy,
                order_status
            } = req.body
            const newOrder = await new Order({
                order_from,
                delivery_date,
                customer_name,
                customer_phone,
                customer_city,
                pincode,
                customer_area,
                customer_address,
                isPaid,
                amount,
                delivery_agent_id,
                delivery_boy,
                order_status,
                createdBy: 'Website'
            })
            await newOrder.save()
            return res.status(201).json({ success: true, message: "Order created successfully", response: newOrder })
        }
        catch (error) {
            console.log("errror", error)
            return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
        }
    },
    getOrder: async (req, res, next) => {
        try {
            const {id} = req.params
            const order = await Order.findById(id).populate("delivery_boy",{'name':1})
            if (! order){
                return res.status(404).json({success:false, message:"Invalid id, Order not found", response:{}})
            }
            return res.status(200).json({success:true, message:"Order found", response:order})
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
        }
    },
    updateOrder: async (req, res, next) => {
        try {
            const {id} = req.params;
            const {
                delivery_date,
                pincode,
                customer_area,
                reason
            } = req.body;
            const order = await Order.findById(id)
            if (! order){
                return res.status(404).json({success:false, message:"Invalid id, Order not found", response:{}})
            }
            if (delivery_date) {
                order.delivery_date = delivery_date;
              }
              if (pincode) {
                order.pincode = pincode;
              }
              if (customer_area) {
                order.customer_area = customer_area;
              }
              if (reason) {
                order.reason = reason;
              }
              await order.save();
            return res.status(200).json({success:true, message:"Order found", response:order})
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
        }
    },
    getOrders: async (req, res, next) => {
        try {
            const queryObject = url.parse(req.url, true).query;
            console.log(queryObject);
            let query = {};
            if (queryObject.pincode && !queryObject.key) {
                query = {
                ...query,
                pincode : { $regex: `${queryObject.pincode}.*`, $options: "i" }
                }
            }
            if (queryObject.area && !queryObject.key) {
                query = {
                ...query,
                customer_area : { $regex: `${queryObject.area}.*`, $options: "i" }
                }
            }
            if(queryObject.key) {
                query = {
                $or:[
                {pincode : { $regex: `${queryObject.key}.*`, $options: "i" }},
                {customer_area : { $regex: `${queryObject.key}.*`, $options: "i" }}
                ]}
            }
            const orders = await Order.find(query).populate("delivery_boy",{'name':1})

          return res.status(200).json({success:true, message:`${orders.length} orders found`, response: orders})
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })
        }
    }
}