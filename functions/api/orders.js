import { verifyAuth } from '../utils/auth';

export async function onRequestGet(context) {
  const { request, env } = context;
  
  const authPayload = await verifyAuth(request, env);
  if (!authPayload) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

  try {
    const { results } = await env.DB.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // This route is public so users can place orders
  try {
    const body = await request.json();
    const { customer_name, customer_email, product_id, total_price, shipping_address } = body;
    
    if (!customer_name || !product_id) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Default status is 'pending'
    const stmt = env.DB.prepare(
      'INSERT INTO orders (customer_name, customer_email, product_id, total_price, status, shipping_address) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(customer_name, customer_email || '', product_id, total_price || 0, 'pending', shipping_address || '');
    
    const result = await stmt.run();
    
    return new Response(JSON.stringify({ success: true, id: result.meta.last_row_id }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
