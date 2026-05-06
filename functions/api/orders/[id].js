import { verifyAuth } from '../../utils/auth';

export async function onRequestPut(context) {
  const { request, env, params } = context;
  const id = params.id;
  
  const authPayload = await verifyAuth(request, env);
  if (!authPayload) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

  try {
    const body = await request.json();
    const { status } = body;
    
    if (!status) {
      return new Response(JSON.stringify({ error: 'No fields to update' }), { status: 400 });
    }

    const query = `UPDATE orders SET status = ? WHERE id = ?`;
    await env.DB.prepare(query).bind(status, id).run();
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
