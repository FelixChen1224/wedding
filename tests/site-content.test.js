const { readFileSync } = require('node:fs');
const assert = require('node:assert/strict');
const test = require('node:test');

const html = readFileSync('index.html', 'utf8');
const script = readFileSync('script.js', 'utf8');
const css = readFileSync('styles.css', 'utf8');

test('shows the 10:30 wedding thanksgiving service before the lunch banquet', () => {
  assert.match(html, /2026\.06\.27 Sat\. 10:30 禮拜 · 12:00 午宴/);
  assert.match(html, /結婚感恩禮拜/);
  assert.match(html, /<time datetime="2026-06-27T10:30:00\+08:00">10:30<\/time>\s*<span>結婚感恩禮拜<\/span>/);
  assert.match(html, /<time datetime="2026-06-27T12:00:00\+08:00">12:00<\/time>\s*<span>午宴開始<\/span>/);
});

test('counts down to the service with separate animated numeric units', () => {
  assert.match(script, /eventStart: '2026-06-27T10:30:00\+08:00'/);
  assert.match(script, /banquetStart: '2026-06-27T12:00:00\+08:00'/);
  assert.match(html, /data-countdown-label/);
  assert.match(html, /data-countdown-days/);
  assert.match(html, /data-countdown-hours/);
  assert.match(html, /data-countdown-minutes/);
  assert.match(html, /data-countdown-seconds/);
  assert.match(css, /\.countdown-grid/);
  assert.match(css, /@keyframes countdown-pop/);
});
