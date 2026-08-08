// Serverless example: api/send-order.js
// NOTE: This file is for reference and must be deployed to a serverless environment (Vercel/Netlify/Render) to work.
// Do NOT put your real bot token into repository files. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID as environment variables.

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const BOT = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT = process.env.TELEGRAM_CHAT_ID;

  if (!BOT || !CHAT) {
    return res.status(500).json({ error: 'Telegram credentials not configured' });
  }

  const { name, phone, product, qty } = req.body || {};
  if (!name || !phone || !product) {
    return res.status(400).json({ error: 'Missing order data' });
  }

  const escape = s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  const text = [
    `📦 <b>سفارش جدید از وب‌سایت</b>`,
    `<b>نام:</b> ${escape(name)}`,
    `<b>شماره:</b> ${escape(phone)}`,
    `<b>موارد سفارش:</b>`,
    escape(product),
    `<b>تعداد:</b> ${escape(qty||'')}`,
    `<b>زمان:</b> ${new Date().toLocaleString()}`
  ].join('\n');

  const url = `https://api.telegram.org/bot${BOT}/sendMessage`;
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: String(CHAT), text: text, parse_mode: 'HTML' })
    });
    const j = await r.json();
    if (!r.ok || !j.ok) return res.status(502).json({ error: 'Telegram API error', detail: j });
    return res.status(200).json({ ok: true, result: j.result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error', detail: String(err) });
  }
}
