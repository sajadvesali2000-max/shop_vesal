# نمونهٔ سادهٔ ثبت سفارش (sample-order)

این پوشه یک پروژهٔ نمونهٔ ساده دارد که یک فرمِ سفارش می‌سازد و هنگام کلیک روی "ثبت سفارش" یک درخواست POST به یک endpoint serverless ارسال می‌کند.

فایل‌ها:
- index.html — صفحهٔ frontend (docs/sample-order/index.html)
- api/send-order.js — نمونهٔ handler serverless (docs/sample-order/api/send-order.js)

نحوهٔ استفاده:
1) اگر می‌خواهید فقط صفحهٔ ایستا را تست کنید (بدون ارسال به تلگرام)، می‌توانید فایل index.html را در مرورگر باز کنید؛ دکمهٔ ثبت یک درخواست POST به ORDER_URL ارسال می‌کند و چون سرور وجود ندارد خطا می‌گیرید.

2) برای ارسال واقعی به تلگرام (پیشنهاد): این handler را در یک سرویس serverless مستقر کنید (Vercel یا Netlify):
   - در Vercel: import project from GitHub → Deploy.
   - سپس در Settings → Environment Variables مقدار زیر را اضافه کنید:
       TELEGRAM_BOT_TOKEN = <توکنِ رباتِ خودتان>
       TELEGRAM_CHAT_ID = 233880219
   - پس از deploy، آدرس تابع معمولاً `https://<project>.vercel.app/api/send-order` خواهد بود.
   - در index.html مقدار ORDER_URL را با آدرس تابع جایگزین کنید.

3) روش سریع (بدون serverless): اگر یک سرویس webhook (مثلاً n8n) دارید که می‌تواند POST ورودی را به تلگرام forward کند، آدرس آن را به ORDER_URL در index.html قرار دهید.

امنیت:
- هرگز توکن تلگرام را در مخزن عمومی یا فایل‌ها قرار ندهید. از Environment Variables استفاده کنید.
- بعد از تست توکن را ریست (rotate) کنید.

اگر می‌خواهید من این پروژه را روی Vercel مستقر کنم، می‌توانی من را به پروژه دعوت کنی یا تو خودت توکن را در Vercel اضافه کنی و آدرس deploy را برای من بفرستی تا ORDER_URL را تنظیم و تست کنم.
