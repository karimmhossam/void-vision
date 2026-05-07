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
    if (price !== undefined && !isNaN(price)) { updates.push('price = ?'); values.push(Number(price)); }
    if (description !== undefined) { updates.push('description = ?'); values.push(description); }
    if (stock !== undefined && !isNaN(stock)) { updates.push('stock = ?'); values.push(Number(stock)); }
    if (status !== undefined) { updates.push('status = ?'); values.push(status); }
    
    if (updates.length === 0) {
      return new Response(JSON.stringify({ error: 'No fields to update' }), { status: 400 });
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(Number(id));
    
    const query = `UPDATE products SET ${updates.join(', ')} WHERE id = ?`;
    
    const result = await env.DB.prepare(query).bind(...values).run();
    
    if (result.meta && result.meta.changes === 0) {
      return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
    }
    
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
