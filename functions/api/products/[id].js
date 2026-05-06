import { verifyAuth } from '../../utils/auth';

export async function onRequestPut(context) {
  const { request, env, params } = context;
  const id = params.id;
  
  const authPayload = await verifyAuth(request, env);
  if (!authPayload) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

  try {
    const body = await request.json();
    const { name, brand, price, description, stock, status } = body;
    
    // Build dynamic update query
    let updates = [];
    let values = [];
    if (name) { updates.push('name = ?'); values.push(name); }
    if (brand) { updates.push('brand = ?'); values.push(brand); }
    if (price !== undefined) { updates.push('price = ?'); values.push(price); }
    if (description !== undefined) { updates.push('description = ?'); values.push(description); }
    if (stock !== undefined) { updates.push('stock = ?'); values.push(stock); }
    // If status existed in DB we'd update it here
    
    if (updates.length === 0) {
      return new Response(JSON.stringify({ error: 'No fields to update' }), { status: 400 });
    }

    values.push(id);
    const query = `UPDATE products SET ${updates.join(', ')} WHERE id = ?`;
    
    await env.DB.prepare(query).bind(...values).run();
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function onRequestDelete(context) {
  const { request, env, params } = context;
  const id = params.id;
  
  const authPayload = await verifyAuth(request, env);
  if (!authPayload) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

  try {
    await env.DB.prepare('DELETE FROM products WHERE id = ?').bind(id).run();
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
