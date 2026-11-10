import { readFile, writeFile, mkdir } from "node:fs/promises";
const read = async (path) => JSON.parse(await readFile(path, "utf8"));
const before = await read("qa/refine/before/summary.json");
const after = await read("qa/refine/after/summary.json");
const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
const names = {
  "ar-mobile": "الرئيسية العربية — جوال",
  "en--mobile": "الرئيسية الإنجليزية — جوال",
  "ar-desktop": "الرئيسية العربية — سطح المكتب",
  "en--desktop": "الرئيسية الإنجليزية — سطح المكتب",
  "projects--mobile": "الأرشيف العربي — جوال",
  "projects-jeetroom--mobile": "تفاصيل Jeetroom العربية — جوال",
};
const summaries = Object.keys(names).map((name) => {
  const summarize = (items) =>
    Object.fromEntries(
      ["performance", "LCP", "CLS", "TBT", "transferKiB", "jsKiB", "mp4"].map((key) => [
        key,
        median(items.filter((item) => item.name === name).map((item) => item[key])),
      ]),
    );
  return { name, label: names[name], before: summarize(before), after: summarize(after) };
});
const seconds = (value) => (value / 1000).toFixed(2);
const row = ({ label, before: b, after: a }) =>
  `| ${label} | ${b.performance} → ${a.performance} | ${seconds(b.LCP)} → ${seconds(a.LCP)} | ${b.CLS} → ${a.CLS} | ${b.transferKiB.toFixed(1)} → ${a.transferKiB.toFixed(1)} | ${b.jsKiB.toFixed(1)} → ${a.jsKiB.toFixed(1)} |`;
const table = `| الحالة | الأداء /100 | LCP ثانية | CLS | النقل KiB | JavaScript KiB |\n|---|---:|---:|---:|---:|---:|\n${summaries.map(row).join("\n")}`;
const qa = await read("qa/refine/after/functional-results.json");
const contrast = await read("qa/refine/after/image-contrast.json");
await writeFile(
  "qa/refine/comparison.json",
  JSON.stringify({ summaries, contrast, rawBefore: before, rawAfter: after }, null, 2),
);
const doc = `# ANAS CODEX — مراجعة الصقل المحلي

10 نوفمبر 2026. التغييرات محلية، دون رفع إلى GitHub أو نشر خارجي. بقي التصدير الثابت و56 مشروعًا ومسارات اللغتين وترتيب الأقسام والشعار SVG والسيرتان وEmailJS.

## ما تغيّر

- الهيرو: الاحتفاظ بعنوان «ما وراء الواجهة»، وإظهار تطوير المواقع والمتاجر والرياض في المساحة النصية القائمة. الزر الدائري صار «شاهد أعمالي» / “View my work”.
- شارة الاسم: العربية RTL وخط عربي وترتيب مؤشر/اسم/سهم مناسب، مع عكس السهم وميل مستقل. الإنجليزية LTR. الموضع مفصول عن نهاية العنوان في الثيمين، وفُحص بصريًا عند 390 و820 و1440px.
- النهاري: بقي الورقي #F0EFE9 والحبر #192439 وأزرق الأفعال #345AB0. تجربة نقل السطر الإنجليزي وحدها لم تحل عبوره فوق السترة؛ استُخدم سطح ورقي خلف السطر فقط. للعربي قناع ساكن أسفل الوجه على الجوال، ومعالجة موضع مستقلة للشاشات الأكبر. جرى فحص الداكن مستقلًا وإعطاء السطر سطحًا مناسبًا بدل الاعتماد على لون الصورة.
- «من أنا»: سطح ورقي أزرق #D7E0F0 ونص كحلي بنسبة 11.69:1 في النهاري. الصورة الجديدة بألوانها الأصلية في القسم وصفحة النبذة، بنسختين WebP بحجمي 5.2 و12.6KiB. صورة المقدمة الحالية محفوظة.
- الأعمال: الصف والرقم والاسم ورابط التفاصيل يتغيرون فورًا. كشف أفقي من جهة القائمة، يمينًا للعربية ويسارًا للإنجليزية، خلال 280ms باستخدام GSAP وtransform. الحركة السابقة تنظّف عند التبديل؛ الأسهم وHome وEnd والنقر واللمس مدعومة. تقليل الحركة يبدّل فورًا. معاينات الفيديو داخل المعرض باقية وتنتظر طلب الزائر.
- تخفيف الحركة الثانوية في القائمة والخدمات والنصوص. انتقال المقدمة إلى Motion Lab محفوظ. MotionDirector يحمّل بعد بدء التمرير على الرئيسية فقط، وتُنظف مشاهده عند مغادرتها. العدد اختُبر: 8 على الرئيسية، صفر خارجها، عبر ثلاث دورات.
- زر صعود دائري: يظهر بعد التمرير، يرتفع عند التحويم وينضغط عند النقر، ويعيد التركيز لرابط البداية. التمرير الفوري في تقليل الحركة. موضعه منطقي للاتجاهين.
- التحميل: صور الأعمال البعيدة تنتظر اقتراب قسمها مع بديل noscript. تهيئة صور المعرض تتم عند اقترابه. لا تحميل كسول لصورة المقدمة ولا preload مكرر لها. اختُبر مصدرا 560 و640px، واختار اختبار الجوال AVIF بحجم 640px ونحو 30.5KiB بدل 720px بنحو 35.3KiB. الخط العربي يُحمّل مسبقًا في العربية فقط، ويبقى متاحًا للنص المختلط في الإنجليزية. نفس ملفات الخطوط الأصلية ورخصتها.
- الأرشيف: البحث يحدّث النتائج مباشرة دون قياسات Flip عند كل حرف؛ حركة التصنيف وزيادة النتائج باقية.
- المحتوى: مقدمة Motion Lab وKripton وJeetroom توضّح المشروع والتنفيذ الموثوق، وترتبط مباشرة بلقطاته. لا نسبة لتصميم هوية العميل إلى أنس، ولا نتائج مختلقة. الدور غير الموثق في الأرشيف يُترك دون ادعاء.
- SEO: Person بمعرّف موحّد في اللغتين. CreativeWork يطابق النص الظاهر، ويذكر مساهمة التطوير للأعمال الموثقة فقط دون creator عام. بطاقات مشاركة من الصور الحقيقية للأعمال الثلاثة، JPEG 1200×630 بأحجام 41–82KiB؛ صورة مشاركة أنس للرئيسية محفوظة.

## القياسات: وسيط ثلاث جولات بذاكرة باردة لكل حالة

${table}

جميع جولات الرئيسية: صفر طلبات MP4 قبل ظهور المعاينة أو طلب الزائر. ملفات Lighthouse الأصلية وملخص الجولات في [المقارنة](../qa/refine/comparison.json)، و[قبل](../qa/refine/before/summary.json) و[بعد](../qa/refine/after/summary.json).

تحقق هدف النقل العربي ≤500KiB، وعدم زيادة JavaScript، وCLS ≤0.1، وأداء سطح المكتب 100/100. الإنجليزية حققت أداء 95. **لم يتحقق LCP ≤2.5s في اللغتين، ولا أداء العربية ≥95**. المسار الحرج المتبقي يتضمن صورة المقدمة ونحو 111KiB من الخطوط و154KiB من JavaScript في العربية؛ التأثير على LCP هنا استدلال من الشلال والمحاكاة، وليس إثباتًا أن كل هذه البايتات تحجب الصورة. لم تُحذف أعمال أو تُخفض جودة صورها لتحقيق الدرجة.

المرجع المنشور الذي قدمته (92 / 3.35s للعربية و98 / 2.46s للإنجليزية) جولة واحدة في بيئة مختلفة؛ لا يُعامل كخط الأساس لهذه المقارنة. خط الأساس المحلي أُخذ قبل التعديل من نفس المستودع.

## ظروف القياس وحدوده

بناء إنتاج ثابت عبر الخادم المحلي نفسه الذي يضغط HTML/CSS/JS بـgzip، Chrome 157 على Windows، Lighthouse 13.5.0، دون إضافات. تنظيف التخزين وذاكرة المتصفح في كل جولة، بالمسار والظروف نفسيهما قبل وبعد. الجوال: 412×823 وDPR 1.75 ومحاكاة RTT 150ms، 1638.4Kbps، وإبطاء CPU بمقدار 4. سطح المكتب: 1440×1000 وDPR 1، RTT 40ms و10240Kbps دون إبطاء CPU. الجولات متتابعة، مع عدم تشغيل اختبارات المتصفح الأخرى أثناء الجولة النهائية.

هذه نتائج مختبر وليست بيانات مستخدمين فعليين. لم يتوفر قياس ميداني لـINP عند المئين 75؛ لم يُستبدل بـTBT. تتضمن الملفات TBT للمراجعة فقط. الأرشيف والتفاصيل ما زالا فوق هدف LCP للجوال؛ صورهما الأصلية محفوظة.

## التباين والتحقق البصري

لقطات كاملة عند 390 و820 و1440px للغتين والثيمين، وفحص تجاوز عند 360px. قورنت نفس أبعاد الشاشة ونفس نقطة القسم. في الاختبار البكسلي التُقط العنوان ثم خلفيته بعد جعل لونه شفافًا مع تثبيت التخطيط؛ حُسب التباين عند بكسلات الحروف الصلبة، واستُبعدت الحواف المضادة للتعرج والبكسلات المتطابقة أصلًا مع الخلفية.

- الإنجليزي النهاري 390px: وسيط وأدنى عينة 5.63:1، مقابل عينة المستخدم السابقة 2.61:1 فوق السترة. لقطة محاولة النقل وحدها محفوظة في الأدلة.
- العربي النهاري 390px: أدنى عينة 4.91:1، والوسيط ${contrast.find((r) => r.locale === "ar" && r.theme === "light" && r.width === 390).median.toFixed(2)}:1.
- السطر في بقية اللقطات النهارية: 5.63:1؛ الداكن: 11.10:1.
- حدود الحقول النهارية 3.61:1، ونص الخطأ 5.99:1. التركيز صريح ولا يعتمد على الخط الزخرفي. فُحصت حالات التركيز والخطأ والاختيار والروابط والأزرار في السياق.

الفحص البكسلي يخص اللقطات والحروف المختبرة، ولا يمثل شهادة وصول شاملة لكل موضع تمرير أو كل متصفح. [تفاصيل العينات](../qa/refine/after/image-contrast.json).

## الاختبارات المنفّذة

- build وTypeScript وLint ناجحة، دون أخطاء أو تحذيرات Lint.
- تدقيق التصدير: 124 صفحة، 56 مشروعًا، 5368 رابطًا/أصلًا محليًا و350 عنصر JSON-LD، دون مشكلات. تحقق canonical وhreflang المتبادل وrobots وsitemap وصيغ بطاقات المشاركة وأحجامها ومعرّف Person وأدوار CreativeWork وبصمتي PDF.
- ${qa.checks.length} تحققًا وظيفيًا: الرئيسية والأرشيف والنبذة والتواصل وKripton بفيديو وJeetroom دون فيديو؛ اللغتان والثيمان، 390/820/1440/360px، لوحة المفاتيح والقائمة وEscape والرجوع والتبديل السريع واللمس وتقليل الحركة وزر الصعود. صفر أخطاء JavaScript وصفر مخالفات axe ضمن جولات الفحص.
- 654 تحققًا للمحتوى المهني والمسار والسيرتين ناجحة.
- 157 تحققًا للفيديو والخدمات والوصول، دون أخطاء أو تحذيرات، مع تشغيل/إيقاف وفشل الفيديو وتقليل الحركة ونطاقات الطلبات.
- 15 تحققًا لـEmailJS، بما فيها نجاح وفشل الخدمة، مع اعتراض جميع الطلبات محليًا: **لم يُرسل أي بريد فعلي**.
- [نتائج الوظائف](../qa/refine/after/functional-results.json)، [التصدير](../qa/export-results.json)، [المحتوى المهني](../qa/career/results.json)، [الفيديو](../qa/polish/results.json)، [تنظيف الحركة](../qa/polish/motion-lifecycle.json).

## الأدلة المرئية

[افتح مراجعة قبل/بعد واللقطات والتسجيلات](../qa/refine/review.html).

- [كشف الأعمال — عربي](../qa/refine/after/reel-ar.webm)، [إنجليزي](../qa/refine/after/reel-en.webm).
- [تحويم وضغط زر الصعود — عربي](../qa/refine/after/back-to-top-ar.webm)، [إنجليزي](../qa/refine/after/back-to-top-en.webm).
- [مقارنة موضع السطر الإنجليزي أولًا](../qa/refine/before/candidate-relocation-en-390.png)، [السطح النهائي](../qa/refine/after/hero-en-light-390.png).

مبادئ الاسترشاد: [WCAG](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)، [Core Web Vitals](https://web.dev/articles/vitals)، [Google Search والذكاء الاصطناعي](https://developers.google.com/search/docs/appearance/ai-features)، [Radix](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale)، [Locomotive](https://locomotive.ca/en)، [Instrument](https://www.instrument.com/work)، [Frontend Design](https://claude.com/marketplace/plugins/frontend-design). لم تُركّب مكتبة حركة أو حزمة تطبيق جديدة، ولم تُضف أقسام أو WebGL أو FAQ مصطنع أو نصوص مخفية.
`;
await mkdir("docs", { recursive: true });
await writeFile("docs/REFINEMENT_REVIEW_AR.md", doc);
const tableHtml = `<table><thead><tr><th>الحالة</th><th>الأداء قبل / بعد</th><th>LCP ثانية</th><th>النقل KiB</th><th>JavaScript KiB</th></tr></thead><tbody>${summaries.map(({ label, before: b, after: a }) => `<tr><th>${label}</th><td>${b.performance} → ${a.performance}</td><td>${seconds(b.LCP)} → ${seconds(a.LCP)}</td><td>${b.transferKiB.toFixed(1)} → ${a.transferKiB.toFixed(1)}</td><td>${b.jsKiB.toFixed(1)} → ${a.jsKiB.toFixed(1)}</td></tr>`).join("")}</tbody></table>`;
const comparisons = [];
for (const locale of ["ar", "en"])
  for (const theme of ["light", "dark"])
    for (const width of [390, 820, 1440])
      for (const area of ["hero", "human"]) {
        const name = `${area}-${locale}-${theme}-${width}.png`;
        comparisons.push(
          `<article><h2>${area === "hero" ? "الملصق الافتتاحي" : "من أنا"} · ${locale === "ar" ? "عربي" : "English"} · ${theme} · ${width}px</h2><div class="pair"><figure><figcaption>قبل</figcaption><a href="before/${name}"><img loading="lazy" src="before/${name}" alt="قبل — ${name}"></a></figure><figure><figcaption>بعد</figcaption><a href="after/${name}"><img loading="lazy" src="after/${name}" alt="بعد — ${name}"></a></figure></div></article>`,
        );
      }
const html = `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ANAS CODEX — قبل وبعد</title><style>body{margin:auto;max-width:1300px;padding:36px 24px;background:#f0efe9;color:#192439;font:17px/1.8 Tahoma,Arial,sans-serif}h1{font-size:32px}h2{font-size:20px}a{color:#345ab0}table{border-collapse:collapse;width:100%;font-size:14px}td,th{padding:12px;border:1px solid #727d8f;text-align:start}td{direction:ltr}.pair{display:grid;grid-template-columns:1fr 1fr;gap:20px;direction:ltr}figure{margin:0;max-width:100%}figcaption{padding:8px;font-weight:bold}img{display:block;width:100%;height:auto;border:1px solid #727d8f}article{margin:50px 0;border-top:1px solid #727d8f}video{width:100%;max-height:700px;background:#101219}p{max-width:1050px}.videos{display:grid;grid-template-columns:1fr 1fr;gap:24px}@media(max-width:650px){.pair,.videos{grid-template-columns:1fr}table{font-size:11px}td,th{padding:5px}}</style><h1>ANAS CODEX · قبل وبعد</h1><p>10 نوفمبر 2026 — مراجعة محلية دون نشر أو رفع إلى GitHub. اللقطات بذات أبعاد الشاشة وموضع القسم. اضغط الصورة لفتحها بحجمها الأصلي.</p><p><a href="../../docs/REFINEMENT_REVIEW_AR.md">تقرير التنفيذ وحدود الاختبار</a> · <a href="comparison.json">جميع الجولات والعينات</a></p>${tableHtml}<p><strong>الأهداف غير المتحققة:</strong> بلوغ LCP مقداره 2.5 ثانية أو أقل في اللغتين، وبلوغ 95 نقطة في العربية. CLS=0، وسطح المكتب 100، والنقل العربي دون 500KiB. INP الميداني غير متوفر.</p><h2>التفاعل وزر الصعود</h2><div class="videos">${["reel-ar", "reel-en", "back-to-top-ar", "back-to-top-en"].map((name) => `<figure><figcaption>${name}</figcaption><video controls muted preload="none" src="after/${name}.webm"></video></figure>`).join("")}</div><h2>محاولة نقل السطر الإنجليزي قبل اختيار السطح الورقي</h2><a href="before/candidate-relocation-en-390.png"><img style="max-width:390px" src="before/candidate-relocation-en-390.png" alt="محاولة النقل وحدها"></a>${comparisons.join("")}</html>`;
await writeFile("qa/refine/review.html", html);
console.log(JSON.stringify(summaries, null, 2));
