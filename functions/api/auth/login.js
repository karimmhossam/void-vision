import { sign } from '../../utils/jwt';

// Helper to hash password using Web Crypto API
async function hashPassword(password) {
  const enc = new TextEncoder();
  const data = enc.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // In a real app, query env.DB for the admin user.
    // For this implementation, we'll check against env.DB.
    const stmt = env.DB.prepare('SELECT id, password_hash FROM admin_users WHERE email = ?').bind(email);
    const user = await stmt.first();

    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Hash incoming password and compare
    const incomingHash = await hashPassword(password);
    
    // For local dev/initial setup, if the password_hash is literally 'hashed_password_here' (from our seed), 
    // let's allow 'admin123' to login and update the hash to the real one, OR just check if it matches.
    let isValid = false;
    if (user.password_hash === 'hashed_password_here' && password === 'voidvision2026') {
        isValid = true;
        // Optional: Update the hash in DB to real hash
        await env.DB.prepare('UPDATE admin_users SET password_hash = ? WHERE id = ?').bind(incomingHash, user.id).run();
    } else if (user.password_hash === incomingHash) {
        isValid = true;
    }

    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const secret = env.JWT_SECRET || 'fallback_secret_for_local_dev';
    const token = await sign(
      { sub: user.id, email, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 }, // 24h expiration
      secret
    );

    // Return token as HttpOnly cookie and JSON
    return new Response(JSON.stringify({ success: true, message: 'Logged in successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `admin_token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict${env.JWT_SECRET ? '; Secure' : ''}`
      },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
