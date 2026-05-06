import { verify } from './jwt';

export async function verifyAuth(request, env) {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').map(c => c.trim());
  const tokenCookie = cookies.find(c => c.startsWith('admin_token='));
  
  if (!tokenCookie) return null;
  
  const token = tokenCookie.split('=')[1];
  const secret = env.JWT_SECRET || 'fallback_secret_for_local_dev';
  
  return await verify(token, secret);
}
