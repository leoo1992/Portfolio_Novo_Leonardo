import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { getSiteUrl } from '../apps/web/src/lib/site-url.ts';

const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (originalSiteUrl === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
  }
});

test('uses the production site URL when no override is configured', () => {
  delete process.env.NEXT_PUBLIC_SITE_URL;
  assert.equal(getSiteUrl(), 'https://portfolio-novo-leonardo-web.vercel.app');
});

test('normalizes a configured host to its canonical origin', () => {
  process.env.NEXT_PUBLIC_SITE_URL = 'example.com/some/path';
  assert.equal(getSiteUrl(), 'https://example.com');
});

test('falls back safely for malformed URLs', () => {
  process.env.NEXT_PUBLIC_SITE_URL = 'https://[';
  assert.equal(getSiteUrl(), 'https://portfolio-novo-leonardo-web.vercel.app');
});
