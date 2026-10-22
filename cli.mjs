#!/usr/bin/env node
import { auditHeaders } from './audit.mjs';

const target = process.argv[2];
if (!target || process.argv.includes('--help')) {
  console.log('Uso: node cli.mjs https://dominio-autorizado.example');
  process.exit(target ? 0 : 2);
}
let url;
try {
  url = new URL(target);
  if (url.protocol !== 'https:' || url.username || url.password) throw Error('Protocolo ou credenciais inválidos');
} catch {
  console.error('Informe uma URL HTTPS válida sem credenciais.');
  process.exit(2);
}
try {
  const response = await fetch(url, { method: 'HEAD', redirect: 'manual', signal: AbortSignal.timeout(8000) });
  const output = {
    target: url.origin,
    http_status: response.status,
    redirect_location: response.status >= 300 && response.status < 400 ? response.headers.get('location') : null,
    checks: auditHeaders(response.headers),
    note: 'Presença não equivale a configuração segura; validar valores e contexto manualmente.',
  };
  console.log(JSON.stringify(output, null, 2));
} catch (error) {
  console.error('Falha na requisição: ' + error.message);
  process.exitCode = 1;
}
