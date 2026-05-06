// A lightweight JWT implementation using Web Crypto API for Cloudflare Workers

function base64urlEncode(source) {
  let encoded = btoa(String.fromCharCode.apply(null, new Uint8Array(source)));
  return encoded.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64urlDecode(base64url) {
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return new Uint8Array(Array.from(atob(base64), c => c.charCodeAt(0)));
}

async function sign(payload, secret) {
  const enc = new TextEncoder();
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = base64urlEncode(enc.encode(JSON.stringify(header)));
  const encodedPayload = base64urlEncode(enc.encode(JSON.stringify(payload)));
  const data = `${encodedHeader}.${encodedPayload}`;

  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  const encodedSignature = base64urlEncode(signature);

  return `${data}.${encodedSignature}`;
}

async function verify(token, secret) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const data = `${encodedHeader}.${encodedPayload}`;
    const signature = base64urlDecode(encodedSignature);
    const enc = new TextEncoder();

    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const isValid = await crypto.subtle.verify('HMAC', key, signature, enc.encode(data));
    
    if (!isValid) return null;
    
    const payload = JSON.parse(new TextDecoder().decode(base64urlDecode(encodedPayload)));
    
    // Check expiry
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    
    return payload;
  } catch (err) {
    return null;
  }
}

export { sign, verify };
