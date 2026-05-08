/*
  Secure Razorpay server for Sween Car Choice ecommerce.
  Run with: npm install && npm start
  This file stays in the root folder as requested.
*/

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 8787;
const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';

app.use(cors({ origin: allowedOrigin === '*' ? true : allowedOrigin.split(',').map(v => v.trim()) }));
app.use(express.json({ limit: '1mb' }));
app.use(express.static(__dirname));

const hasRazorpay = Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
const razorpay = hasRazorpay ? new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
}) : null;

const hasSupabaseService = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
const supabaseAdmin = hasSupabaseService
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
  : null;

function rupeesToPaise(amount) {
  return Math.round(Number(amount || 0) * 100);
}

function safeQty(value) {
  const n = Number(value || 0);
  return Number.isFinite(n) ? Math.max(1, Math.min(50, Math.floor(n))) : 1;
}

async function calculatePricing(items, couponCode) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Cart is empty.');
  }

  let pricedItems = [];

  if (supabaseAdmin) {
    const ids = items.map(item => item.id).filter(Boolean);
    const { data: products, error } = await supabaseAdmin
      .from('products')
      .select('id,name,price,qty')
      .in('id', ids);
    if (error) throw error;

    pricedItems = items.map(item => {
      const product = products.find(p => String(p.id) === String(item.id));
      if (!product) throw new Error(`Product unavailable: ${item.id}`);
      const qty = Math.min(safeQty(item.qty), Number(product.qty || 0));
      if (qty <= 0) throw new Error(`${product.name} is out of stock.`);
      return { id: product.id, name: product.name, price: Number(product.price), qty };
    });
  } else {
    // Development fallback only. In production set SUPABASE_SERVICE_ROLE_KEY so prices are verified on the server.
    pricedItems = items.map(item => ({
      id: item.id,
      name: item.name || item.id,
      price: Number(item.price || 0),
      qty: safeQty(item.qty)
    }));
  }

  const subtotal = pricedItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  let discount = 0;
  let coupon = null;

  if (couponCode) {
    if (supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('coupons')
        .select('*')
        .eq('code', String(couponCode).toUpperCase())
        .eq('active', true)
        .maybeSingle();
      if (error) throw error;
      coupon = data;
    }

    if (coupon && subtotal >= Number(coupon.min_cart || 0)) {
      discount = coupon.type === 'percent'
        ? Math.round(subtotal * (Number(coupon.value || 0) / 100))
        : Number(coupon.value || 0);
    }
  }

  discount = Math.min(discount, subtotal);
  const shipping = subtotal - discount > 0 && subtotal - discount < 5000 ? 199 : 0;
  const total = Math.max(0, subtotal - discount + shipping);

  if (total < 1) throw new Error('Invalid order total.');
  return { items: pricedItems, subtotal, discount, shipping, total };
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, razorpay: hasRazorpay, supabasePricing: hasSupabaseService });
});

app.post('/api/create-razorpay-order', async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(500).json({ error: 'Razorpay keys are missing on server.' });
    }

    const { items, couponCode, customer } = req.body || {};
    const pricing = await calculatePricing(items, couponCode);
    const receipt = `sween_${Date.now()}`.slice(0, 40);

    const order = await razorpay.orders.create({
      amount: rupeesToPaise(pricing.total),
      currency: 'INR',
      receipt,
      notes: {
        shop: 'Sween Car Choice',
        customer_name: customer?.name || '',
        customer_phone: customer?.phone || '',
        coupon: couponCode || ''
      }
    });

    res.json({ ...order, pricing });
  } catch (error) {
    console.error('Order error:', error);
    res.status(400).json({ error: error.message || 'Could not create order.' });
  }
});

app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing Razorpay payment fields.' });
    }

    const generated = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const a = Buffer.from(generated, 'hex');
    const b = Buffer.from(String(razorpay_signature), 'hex');
    const verified = a.length === b.length && crypto.timingSafeEqual(a, b);

    if (!verified) return res.status(400).json({ verified: false, error: 'Invalid payment signature.' });
    res.json({ verified: true });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(400).json({ verified: false, error: error.message || 'Verification failed.' });
  }
});

app.listen(PORT, () => {
  console.log(`Sween Car Choice server running on http://localhost:${PORT}`);
});
