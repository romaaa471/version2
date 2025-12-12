import { createClerkClient } from '@clerk/backend';
import mongoose from 'mongoose';
import orderModel from '../server/models/OrderModel.js';

// Initialize Clerk client
const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

// Connect to MongoDB
let mongooseConnection = null;

const connectDB = async () => {
  if (mongooseConnection) {
    return mongooseConnection;
  }
  
  if (mongoose.connections[0]?.readyState === 1) {
    mongooseConnection = mongoose.connections[0];
    return mongooseConnection;
  }
  
  try {
    await mongoose.connect(process.env.MONGO_URI);
    mongooseConnection = mongoose.connection;
    console.log('MongoDB connected');
    return mongooseConnection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Verify Clerk token and get user ID
const verifyAuth = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Unauthorized');
  }

  const token = authHeader.substring(7);
  
  try {
    // Verify the session token using Clerk
    const session = await clerkClient.verifyToken(token);
    return session.sub; // Clerk user ID
  } catch (error) {
    console.error('Token verification error:', error);
    throw new Error('Invalid token');
  }
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectDB();
    const userId = await verifyAuth(req);

    if (req.method === 'POST') {
      // Create order
      const { items, totals, deliveryInfo, paymentInfo } = req.body;
      
      // Calculate total amount
      const amount = totals?.grandTotal || 0;
      
      const newOrder = new orderModel({
        userId: userId,
        items: items,
        amount: amount,
        address: deliveryInfo || {},
        status: 'Food Processing',
        payment: paymentInfo?.method ? true : false
      });

      const savedOrder = await newOrder.save();
      return res.status(200).json({ success: true, orderId: savedOrder._id.toString() });
    }

    if (req.method === 'GET') {
      // Get user orders
      const orderId = req.query.id || req.url.split('/').pop();
      
      if (orderId && orderId !== 'orders') {
        // Get single order
        const order = await orderModel.findById(orderId);
        if (!order) {
          return res.status(404).json({ message: 'Order not found' });
        }
        // Verify order belongs to user
        if (order.userId !== userId) {
          return res.status(403).json({ message: 'Unauthorized' });
        }
        return res.status(200).json({ success: true, order });
      } else {
        // Get all user orders
        const orders = await orderModel.find({ userId: userId }).sort({ date: -1 });
        return res.status(200).json({ success: true, orders });
      }
    }

    if (req.method === 'PATCH' && req.query.id) {
      // Update order status (admin only - you can add admin check here)
      const { status } = req.body;
      await orderModel.findByIdAndUpdate(req.query.id, { status });
      return res.status(200).json({ success: true, message: 'Status updated' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error:', error);
    if (error.message === 'Unauthorized' || error.message === 'Invalid token') {
      return res.status(401).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
}

