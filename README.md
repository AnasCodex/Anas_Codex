# ANAS CODEX

بورتفوليو أنس ناصر بالعربية والإنجليزية، مبني بـ Next.js وTypeScript وGSAP. العربية افتراضية، والإنجليزية في `/en/`. الموقع يُصدّر ملفات ثابتة بالكامل دون قاعدة بيانات أو خادم تطبيق.

## ملفات الرفع

- **استضافة ثابتة / cPanel:** ارفع محتويات مجلد `out/` إلى جذر الموقع، أو فك `release/anas-codex-static.zip` هناك. يجب أن يكون `index.html` في جذر الاستضافة مباشرة، مع إبقاء `_next/` وملفات `__next.*.txt` وبقية المجلدات. فعّل HTTPS وضغط gzip أو Brotli، واستخدم `404.html` لصفحات الخطأ.
- **GitHub / Vercel:** استخدم ملفات المصدر الموجودة في `release/anas-codex-source.zip`. تتضمن الكود والأصول العامة والإعدادات دون الملفات المؤقتة أو المدخلات الخاصة. أمر التثبيت `npm ci`، وأمر البناء `npm run build`، ومجلد الإخراج `out`.
- لا ترفع `input/` أو `.next/` أو `node_modules/` أو `qa/` أو ملفات `.env.local` إلى الاستضافة الثابتة. مجلد `input/` محفوظ محليًا للأصول والمراجع الخاصة، وليس مطلوبًا لبناء الموقع.
- حزمتا ZIP تمثلان لقطة من النسخة عند تجهيزهما؛ بعد أي تعديل، أعد البناء وجهّز حزمة جديدة من الملفات الناتجة.

## النطاق وإعدادات التواصل

قبل بناء نسخة لنطاق جديد، انسخ `.env.example` إلى `.env.local` واضبط:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

النطاق الافتراضي الحالي هو `https://anas-codex.vercel.app`. يؤثر في canonical وhreflang وsitemap وOpen Graph؛ يجب إعادة البناء بعد تغييره. هذه المتغيرات عامة ومخصصة للمتصفح؛ لا تضع فيها مفاتيح خاصة أو كلمات مرور.

نموذج التواصل يحتاج معرفات EmailJS الحقيقية ليُرسل. عند غيابها يظهر تنبيه واضح وبريد مباشر. لم يُختبر تسليم بريد فعلي دون إعدادات الخدمة.

1. أضف Email Service وقالبًا في [EmailJS](https://www.emailjs.com/).
2. اجعل المستلم بريدك الثابت، وReply-To هو `{{user_email}}`. حقول القالب: `{{user_name}}` و`{{user_email}}` و`{{subject}}` و`{{message}}`.
3. اضبط النطاقات المسموحة في الخدمة؛ اسمح بـlocalhost أثناء التطوير فقط. راجع حدود الإرسال والحظر.
4. النموذج يحتوي Honeypot وتقييد تكرار الإرسال داخل SDK لمدة 30 ثانية. فعّل الحماية من جهة EmailJS أيضًا. reCAPTCHA غير مربوط حاليًا؛ لا تفرضه في القالب قبل ربط الأداة.
5. أعد البناء بعد إضافة القيم، ثم تحقق من وصول الرسائل وReply-To عند تفعيل الخدمة.

## التشغيل والبناء

يتطلب Node.js 22.9 أو أحدث. اختُبر على Windows باستخدام Node.js 24.16.

```sh
npm ci
npm run dev
```

افتح `http://127.0.0.1:3000`. لبناء نسخة الإنتاج:

```sh
npm run lint
npm run build
npm run typecheck
npm run audit:export
npm run preview
```

المعاينة تخدم `out/` وتدعم ضغط النصوص ونطاقات الفيديو. يتضمن البناء معالجة مسارات RSC على Windows؛ لا تعدّل `node_modules`. لا توجد API Routes أو Server Actions.

## تنظيم المشروع

| المسار | الاستخدام |
| --- | --- |
| `src/app/` | الصفحات والمسارات العربية والإنجليزية وCSS وSEO |
| `src/components/` | الواجهة والملاحة والتفاعلات والنموذج |
| `src/lib/content.ts` | النبذة والخبرات والتخصصات وأوصاف المشاريع |
| `src/data/projects.json` | 56 مشروعًا مع الصور والروابط وبيانات الفيديو |
| `public/` | الصور والفيديوهات والسيرتان والشعار وتراخيص الخطوط؛ لازمة للنشر |
| `scripts/` | أدوات البناء والمعاينة والتحقق وصيانة الأصول |
| `input/` | الأصول والمراجع الخاصة المحفوظة محليًا؛ خارج Git وحزم النشر |
| `out/` | النسخة الثابتة المولّدة؛ جاهزة للاستضافة |

الصفحات الأساسية: الرئيسية، `/projects/`، تفاصيل كل مشروع، `/about/`، `/expertise/`، `/resume/`، `/contact/`. النسخ الإنجليزية تحت `/en/`. تُولّد 124 صفحة محتوى إضافة إلى 404 وsitemap وrobots، باتجاه HTML صحيح لكل لغة.

الوضع الداكن افتراضي، ويُحفظ الاختيار دون وميض. شعار المقدمة SVG ثابت، دون تحميل Three.js. GSAP مسؤول عن الحركة وانتقالات الأقسام والصفحات، مع احترام تقليل الحركة. لا يوجد تمرير مصطنع.

## المشاريع والتسجيلات

لإضافة مشروع، ضع صوره وملف `project.json` داخل مجلد محلي:

```json
{
  "slug": "my-project",
  "name": { "ar": "اسم المشروع", "en": "Project name" },
  "category": "Next.js",
  "url": "",
  "images": ["desktop.png"]
}
```

```sh
npm run project:add -- input/projects/my-project/project.json
npm run build
npm run audit:export
```

الأداة تحفظ الأصل وتنتج صور WebP متجاوبة وتضيف السجل. عدّل `projectSummary` لإضافة وصف موثّق. اختيارات الرئيسية داخل `home.tsx` و`work-reel.tsx`؛ حقل `featured` وحده لا يغيّرها.

توجد ستة تسجيلات محسنة كاملة لـKripton وBawsala وRooh وتجربة الألعاب وبورتفوليو React وبورتفوليو الجزيرة. التفاصيل تُحمّل الفيديو عند طلب التشغيل؛ معاينة Kripton صامتة وتتوقف خارج الشاشة وتحترم تقليل الحركة. الأصول السبعة باقية في `input/project-videos/`؛ تسجيل Majal يحتاج بيانات دور موثقة قبل إنشاء صفحة له. سجلات المطابقة المحلية في `input/references/video-mapping.json`.

نسخ الفيديو جاهزة للبناء. لإعادة التحويل اختياريًا، وفّر FFmpeg وFFprobe واضبط `FFMPEG_PATH` و`FFPROBE_PATH` لمساريهما، ثم شغّل `node scripts/audit-project-videos.mjs` و`node scripts/prepare-project-videos.mjs`. تتطلب هذه العملية الأصول المحلية؛ لا تحذفها أو تنسب تسجيلًا لمشروع دون تحقق.

## التحقق الاختياري

بعد البناء وتشغيل المعاينة:

```sh
npm run test:browser
npm run test:motion
npm run test:polish
npm run audit:lighthouse
```

تحتاج فحوص المتصفح Google Chrome؛ تسجيل الفيديو يحتاج `npx playwright install ffmpeg` مرة واحدة. استخدم `QA_URL` لعنوان المعاينة، مثل `http://127.0.0.1:3000`. تُنشأ النتائج والصور داخل `qa/`، وهو مجلد مؤقت مستبعد من Git والنشر. لا يلزم تشغيل `test:redesign` مع `test:browser` لأنهما يشغّلان الفحص نفسه.

لفحص النموذج دون إرسال بريد، اضبط `QA_EMAILJS_URL` لعنوان المعاينة المحلي و`QA_EMAILJS_FIXTURE=1` ثم شغّل `npm run test:emailjs`. تُعترض طلبات EmailJS بمحاكاة داخل متصفح الاختبار فقط؛ لا تُعدّل ملفات البناء ولا يُرسل بريد فعلي.

[نظام التصميم](DESIGN_SYSTEM.md) · [مصادر المحتوى](CONTENT_AUDIT.md) · [إعدادات البحث](SEO_CHECKLIST.md)
