// Serverless handler (Node.js) — docs/sample-order/api/send-order.js
// This handler expects TELEGRAM_BOT_TOKEN in environment variables.
// By default CHAT_ID falls back to 233880219 (the ID you asked to use).

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const BOT = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT = process.env.TELEGRAM_CHAT_ID || '233880219';

  if (!BOT) return res.status(500).json({ error: 'Server not configured (missing TELEGRAM_BOT_TOKEN)' });

  const { name, phone, address, qty } = req.body || {};
  if (!name || !phone) return res.status(400).json({ error: 'Missing name or phone' });

  const escape = s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  const text = [
    `📦 <b>سفارش جدید از وب‌سایت نمونه</b>`,
    `<b>نام:</b> ${escape(name)}`,
    `<b>شماره:</b> ${escape(phone)}`,
    `<b>تعداد:</b> ${escape(qty||'1')}`,
    `<b>آدرس:</b> ${escape(address||'-')}`,
    `<b>زمان:</b> ${new Date().toLocaleString()}`
  ].join('\n');

  const url = `https://api.telegram.org/bot${BOT}/sendMessage`;
  try{
    const r = await fetch(url, {
      method: 'POST', headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ chat_id: String(CHAT), text: text, parse_mode: 'HTML' })
    });
    const j = await r.json();
    if(!r.ok || !j.ok) return res.status(502).json({ error: 'Telegram API error', detail: j });
    return res.status(200).json({ ok: true, result: j.result });
  }catch(err){ console.error(err); return res.status(500).json({ error: 'Server error', detail: String(err) }); }
}
