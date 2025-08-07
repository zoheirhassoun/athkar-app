# 🐙 **إعداد GitHub للنشر**

## 📝 **خطوات إنشاء المستودع:**

### **1️⃣ إنشاء مستودع جديد:**
1. اذهب إلى: https://github.com/new
2. **Repository name:** `athkar-app`
3. **Description:** `تطبيق الأذكار - رفيقك اليومي للأذكار والتسبيح مع عداد تفاعلي`
4. اجعله **Public** ✅
5. **لا تضع** ✅ في "Add a README file"
6. **لا تضع** ✅ في "Add .gitignore" 
7. **لا تضع** ✅ في "Choose a license"
8. اضغط **"Create repository"**

### **2️⃣ ربط المشروع بـ GitHub:**
بعد إنشاء المستودع، ستحصل على رابط مثل:
`https://github.com/zoheir/athkar-app.git`

```bash
# ربط المشروع المحلي بـ GitHub
git remote add origin https://github.com/zoheir/athkar-app.git

# رفع الكود إلى GitHub
git push -u origin main
```

### **3️⃣ تفعيل GitHub Pages:**
1. اذهب إلى **Settings** في المستودع
2. اختر **Pages** من القائمة الجانبية
3. في **Source** اختر **"Deploy from a branch"**
4. في **Branch** اختر **"main"**
5. في **Folder** اختر **"/ (root)"**
6. اضغط **Save**

### **4️⃣ نشر ملفات الويب:**
```bash
# إنشاء فرع gh-pages ونشر ملفات الويب
git subtree push --prefix build/web origin gh-pages
```

---

## 🔗 **الروابط بعد النشر:**

- **المستودع:** `https://github.com/zoheir/athkar-app`
- **التطبيق المباشر:** `https://zoheir.github.io/athkar-app`

---

## ⚡ **بدائل سريعة أخرى:**

### **🟢 Netlify (الأسهل):**
1. اذهب إلى: https://netlify.com
2. اسحب مجلد `build/web` إلى الموقع
3. سيعطيك رابط فوري!

### **🔵 Vercel:**
1. اذهب إلى: https://vercel.com
2. ارفع مجلد `build/web`
3. جاهز خلال ثوانٍ!

---

## 📋 **نصائح مهمة:**

- ✅ **تأكد من أن الملفات في `build/web/` موجودة**
- ✅ **GitHub Pages قد يستغرق 5-10 دقائق للتفعيل**
- ✅ **يمكنك تحديث المحتوى بـ `git push` عادي**
- ✅ **لتحديث الويب: `git subtree push --prefix build/web origin gh-pages --force`**

---

**بعد إنشاء المستودع، عُد إلى هنا وسأكمل النشر! 🚀**