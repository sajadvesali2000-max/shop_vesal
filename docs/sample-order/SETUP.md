راهنمای تنظیم توکن و راه‌اندازی (فارسی)

این صفحه توضیح می‌دهد چگونه توکن بات تلگرام را به‌صورت امن در پروژه قرار دهید تا endpoint سروری (/api/send-order) بتواند پیام‌های سفارش را به تلگرام ارسال کند.

روش‌های امن برای قراردادن توکن

1) تست محلی (محلی روی کامپیوتر خودتان)
   - در شاخهٔ ریشهٔ پروژه یک فایل جدید بسازید با نام `.env` (این فایل به طور پیش‌فرض در .gitignore قرار گرفته و نباید commit شود).
   - محتویات را از `docs/sample-order/.env.example` کپی کرده و مقدار `TELEGRAM_BOT_TOKEN` را با توکن واقعی‌تان جایگزین کنید.
   - مثال:
       TELEGRAM_BOT_TOKEN=8688468202:AAF_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
       TELEGRAM_CHAT_ID=233880219
       PORT=3000
   - سپس سرور محلی را اجرا کنید (اگر از کد Express نمونه استفاده می‌کنید):
       npm install
       npm start
   - سپس صفحهٔ sample-order را باز و تست ارسال را انجام دهید.

2) استقرار در Vercel (یا هر سرویس serverless) — روشِ پیشنهادی برای تولید
   - پروژه را در Vercel import کنید (Import Project → GitHub → انتخاب repo).
   - در داشبورد پروژه در بخش Settings → Environment Variables متغیرهای زیر را اضافه کنید (Production):
       - TELEGRAM_BOT_TOKEN = <توکن بات شما>
       - TELEGRAM_CHAT_ID = 233880219
   - سپس Deploy را اجرا کنید. آدرس تابع serverless معمولاً `https://<project>.vercel.app/api/send-order` خواهد بود.
   - مقدار `ORDER_URL` در `docs/sample-order/index.html` را به آن آدرس تغییر دهید (یا بگویید من این تغییر را commit کنم).

3) استفاده از Netlify
   - مشابه Vercel: پروژه را متصل کنید و در تنظیمات Environment variables توکن و chat_id را اضافه کنید.

نکات امنیتی و عملی
  - فایل `.env` را **هرگز** در مخزن عمومی قرار ندهید. اگر به اشتباه آن را commit کردید بلافاصله توکن را در BotFather روتیت کنید.
  - برای تست محلی استفاده از `.env` خوب است؛ برای محیط تولید از Environment Variables پنل میزبان (Vercel/Netlify) استفاده کنید.
  - اگر از webhook سرویس ثالث (مثل n8n) استفاده می‌کنید، می‌توانید آن webhook را به جای تابع سروری در `ORDER_URL` قرار دهید.

راهنمای سریع تست
  - پس از راه‌اندازی سرور یا deploy تابع، می‌توانید با curl یک درخواست تست بزنید:

    curl -X POST <ORDER_URL> -H "Content-Type: application/json" -d '{"name":"تست","phone":"09120000000","product":"نمونه","qty":"1"}'

  - در صورت موفقیت باید پیام سفارش را در تلگرامِ مدیر (chat_id=233880219) مشاهده کنید.

اگر می‌خواهید من ادامه بدهم
  - اگر مایل باشید من می‌توانم پس از اینکه شما توکن را در Vercel/Netlify اضافه کردید، آدرس deploy را بگیرم و `ORDER_URL` را در فایل frontend به‌روزرسانی کنم و یک تست کامل انجام دهم.
  - یا اگر می‌خواهید من را invite کنید به پروژهٔ Vercel تا خودم ENV را امن ست کنم، بگویید و آدرس ایمیلی که دعوت باید شود را ارسال کنید.
