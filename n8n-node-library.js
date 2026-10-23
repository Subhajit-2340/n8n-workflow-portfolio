/**
 * n8n Node Library
 * Dedicated module containing node definitions, SVG icon map, and canvas connection math.
 */

// 1. SVG Icon Map
const I = {
  mail: '<rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M3.5 7l8.5 6 8.5-6" fill="none" stroke="currentColor" stroke-width="2.4"/>',
  grid: '<path d="M6 2h8l5 5v15H6z" fill="currentColor"/><path d="M9 11h7v7H9zM9 14.5h7M12.5 11v7" fill="none" stroke="#fff" stroke-width="1.5"/>',
  drive: '<path d="M8 3h8l6 10.5-4 7H6l-4-7z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M8 3l10 17.5M16 3L6 20.5M2 13.5h20" stroke="currentColor" stroke-width="2"/>',
  hash: '<path d="M9 3L7 21M17 3l-2 18M4 9h17M3 15h17" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
  plane: '<path d="M21 3L2.5 10.5l6 2.5L19 5 10.5 14.5v5.5l3.2-3.6 4.3 2.6z" fill="currentColor"/>',
  spark: '<path d="M12 2c.8 5.5 4.5 9.2 10 10-5.5.8-9.2 4.5-10 10-.8-5.5-4.5-9.2-10-10 5.5-.8 9.2-4.5 10-10z" fill="currentColor"/>',
  globe: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M3 12h18M12 3c3.5 3.5 3.5 14.5 0 18M12 3c-3.5 3.5-3.5 14.5 0 18" fill="none" stroke="currentColor" stroke-width="2"/>',
  code: '<path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z" fill="currentColor"/>',
  clock: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M12 6.5V12l4 2.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
  branch: '<path d="M5 4v16M5 8c0 6 14 2 14 9M19 4v6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="5" cy="4" r="2" fill="currentColor"/><circle cx="19" cy="20" r="2" fill="currentColor"/>',
  merge: '<path d="M4 4c8 0 8 8 8 8s0 8 8 8M4 20c8 0 8-8 8-8s0-8 8-8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
  loop: '<path d="M20 12a8 8 0 10-3 6.2M20 5v7h-7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  filter: '<path d="M3 4h18l-7 8.5V20l-4-2v-5.5z" fill="currentColor"/>',
  edit: '<path d="M4 20l1-5L16 4l4 4L9 19zM14 6l4 4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
  chat: '<path d="M4 4h16v12H10l-5 4v-4H4z" fill="currentColor"/>',
  phone: '<path d="M12 3a9 9 0 00-7.7 13.6L3 21l4.5-1.2A9 9 0 1012 3z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5" fill="none" stroke="currentColor" stroke-width="2.4"/>',
  bot: '<rect x="4" y="8" width="16" height="12" rx="3" fill="currentColor"/><circle cx="9" cy="14" r="1.8" fill="#fff"/><circle cx="15" cy="14" r="1.8" fill="#fff"/><path d="M12 8V4" stroke="currentColor" stroke-width="2.4"/><circle cx="12" cy="3.5" r="1.8" fill="currentColor"/>',
  db: '<ellipse cx="12" cy="6" rx="8" ry="3" fill="currentColor"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6c0 1.7-3.6 3-8 3S4 7.7 4 6z" fill="none" stroke="currentColor" stroke-width="2.2"/>',
  note: '<rect x="4" y="3" width="16" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M9 17V8l6 9V8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>',
  cube: '<path d="M12 2l9 5v10l-9 5-9-5V7zM3 7l9 5 9-5M12 12v10" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>',
  resp: '<path d="M21 12H7M12 6l-6 6 6 6M3 4v16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  hand: '<path d="M8 12V5.5a1.5 1.5 0 013 0V11M11 11V4.5a1.5 1.5 0 013 0V11M14 11V6a1.5 1.5 0 013 0v8c0 4-2 7-6 7-3 0-5-2-6-4l-2-4a1.5 1.5 0 012.5-1.5L8 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  sheetsw: '<path d="M3 6h6l3 4h9M3 18h6l3-4M12 10h9M12 14h9" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
  mic: '<rect x="9" y="3" width="6" height="12" rx="3" fill="currentColor"/><path d="M5 11a7 7 0 0014 0M12 18v3" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>'
};

// 2. Node Catalog Definition
// [name, iconKey, colorHex, category, { t: 1 (isTrigger), o: ['portLabel', ...] (multiOutputs) }]
const N = [
  ['Webhook', 'bolt', '#ff6d5a', 'Triggers', { t: 1 }],
  ['Schedule Trigger', 'clock', '#ff6d5a', 'Triggers', { t: 1 }],
  ['Manual Trigger', 'hand', '#ff6d5a', 'Triggers', { t: 1 }],
  ['Gmail Trigger', 'mail', '#ea4335', 'Triggers', { t: 1 }],
  ['Telegram Trigger', 'plane', '#2aabee', 'Triggers', { t: 1 }],
  ['Slack Trigger', 'hash', '#4a154b', 'Triggers', { t: 1 }],
  ['IF', 'branch', '#2ecc9a', 'Flow', { o: ['true', 'false'] }],
  ['Switch', 'branch', '#2ecc9a', 'Flow', { o: ['0', '1', '2'] }],
  ['Merge', 'merge', '#2ecc9a', 'Flow', {}],
  ['Loop Over Items', 'loop', '#2ecc9a', 'Flow', { o: ['loop', 'done'] }],
  ['Wait', 'clock', '#7a7a86', 'Flow', {}],
  ['Filter', 'filter', '#2ecc9a', 'Flow', {}],
  ['HTTP Request', 'globe', '#4a6cf7', 'Core', {}],
  ['Code', 'code', '#ff6d5a', 'Core', {}],
  ['Edit Fields (Set)', 'edit', '#0a9d8f', 'Core', {}],
  ['Respond to Webhook', 'resp', '#4a6cf7', 'Core', {}],
  ['Aggregate', 'sheetsw', '#0a9d8f', 'Core', {}],
  ['Gmail', 'mail', '#ea4335', 'Google', {}],
  ['Google Sheets', 'grid', '#0f9d58', 'Google', {}],
  ['Google Drive', 'drive', '#1a73e8', 'Google', {}],
  ['Google Docs', 'note', '#4285f4', 'Google', {}],
  ['Google Calendar', 'cal', '#4285f4', 'Google', {}],
  ['Google Gemini', 'spark', '#8b5cf6', 'Google', {}],
  ['Slack', 'hash', '#e01e5a', 'Communication', {}],
  ['Telegram', 'plane', '#2aabee', 'Communication', {}],
  ['Discord', 'chat', '#5865f2', 'Communication', {}],
  ['WhatsApp', 'phone', '#25d366', 'Communication', {}],
  ['Microsoft Teams', 'chat', '#5059c9', 'Communication', {}],
  ['OpenAI', 'spark', '#10a37f', 'AI', {}],
  ['AI Agent', 'bot', '#7c5cff', 'AI', {}],
  ['Anthropic', 'spark', '#d97757', 'AI', {}],
  ['Whisper (Audio)', 'mic', '#10a37f', 'AI', {}],
  ['Airtable', 'grid', '#18bfff', 'Data & Apps', {}],
  ['Notion', 'note', '#444', 'Data & Apps', {}],
  ['Postgres', 'db', '#336791', 'Data & Apps', {}],
  ['Supabase', 'db', '#3ecf8e', 'Data & Apps', {}],
  ['MySQL', 'db', '#00758f', 'Data & Apps', {}],
  ['Shopify', 'cube', '#5e8e3e', 'Data & Apps', {}],
  ['HubSpot', 'cube', '#ff7a59', 'Data & Apps', {}],
  ['Stripe', 'cube', '#635bff', 'Data & Apps', {}]
];

// 3. Helper Functions
const ico = (k, c) => `<svg viewBox="0 0 24 24" style="color:${c}">${I[k] || ''}</svg>`;

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s || '';
  return d.innerHTML;
}

function getPortPos(n, type, pidx) {
  const idx = n.defIdx !== undefined ? n.defIdx : (n.i !== undefined ? n.i : 0);
  const def = N[idx] || ['', '', '', '#fff', {}];
  const opts = def[4] || {};
  
  // Input: centered on the left edge (x: n.x, y: n.y + 32)
  if (type === 'in') {
    return { x: n.x, y: n.y + 32 };
  }
  
  // Output: on the right edge (x: n.x + 64)
  if (opts && opts.o) {
    const outs = opts.o;
    const c = outs.length;
    if (c === 2) {
      const pcts = [0.33, 0.67];
      return { x: n.x + 64, y: n.y + 64 * pcts[pidx || 0] };
    } else if (c === 3) {
      const pcts = [0.25, 0.5, 0.75];
      return { x: n.x + 64, y: n.y + 64 * pcts[pidx || 0] };
    }
  }
  return { x: n.x + 64, y: n.y + 32 };
}

function bezier(a, b) {
  const dx = Math.max(40, Math.abs(b.x - a.x) / 2);
  return `M${a.x} ${a.y} C${a.x + dx} ${a.y} ${b.x - dx} ${b.y} ${b.x} ${b.y}`;
}
