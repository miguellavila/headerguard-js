/** Evaluate defensive response headers; no exploits or crawling. */
export function auditHeaders(headers) {
  const get = (name) => String(headers.get(name) ?? '').trim();
  const rules = [
    ['Strict-Transport-Security', Boolean(get('strict-transport-security')), 'HSTS ausente; importante em conexões HTTPS'],
    ['Content-Security-Policy', Boolean(get('content-security-policy')), 'CSP ausente; avaliar política apropriada'],
    ['X-Content-Type-Options', get('x-content-type-options').toLowerCase() === 'nosniff', 'Definir X-Content-Type-Options: nosniff'],
    ['Referrer-Policy', Boolean(get('referrer-policy')), 'Definir política de Referer'],
    ['Permissions-Policy', Boolean(get('permissions-policy')), 'Limitar APIs e permissões do navegador'],
  ];
  return rules.map(([header, present, recommendation]) => ({
    header, status: present ? 'configured' : 'review', recommendation: present ? null : recommendation,
  }));
}
