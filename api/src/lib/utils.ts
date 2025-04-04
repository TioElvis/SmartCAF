import { Request } from 'express';

export function getClientInfo(request: Request) {
  const ip_address = request.ip || 'unknown';
  const user_agent = request.headers['user-agent'] || 'unknown';

  return { user_agent, ip_address };
}
