import { Request } from 'express';

export function getClientInfo(request: Request) {
  const user_agent = request.headers['user-agent'] || 'unknown';
  const ip_address =
    request.ip ||
    request.headers['x-forwarded-for']?.toString().split(',')[0] ||
    request.socket.remoteAddress ||
    'unknown';

  return { user_agent, ip_address };
}
