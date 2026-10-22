import test from 'node:test';
import assert from 'node:assert/strict';
import { auditHeaders } from '../audit.mjs';

test('flags missing headers for review', () => {
  const result = auditHeaders(new Headers());
  assert.equal(result.length, 5);
  assert.ok(result.every(item => item.status === 'review'));
});
test('recognizes configured headers', () => {
  const headers = new Headers({
    'strict-transport-security': 'max-age=31536000',
    'content-security-policy': "default-src 'self'",
    'x-content-type-options': 'nosniff',
    'referrer-policy': 'no-referrer',
    'permissions-policy': 'camera=()',
  });
  assert.ok(auditHeaders(headers).every(item => item.status === 'configured'));
});
test('requires nosniff for mime protection', () => {
  const result = auditHeaders(new Headers({ 'x-content-type-options': 'invalid' }));
  assert.equal(result.find(x => x.header === 'X-Content-Type-Options').status, 'review');
});
