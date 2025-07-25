# 📝 RSVP Form Solutions cho GitHub Pages

Vì GitHub Pages là static hosting, bạn cần dịch vụ thứ 3 để xử lý form data. Đây là các giải pháp tốt nhất:

## 🥇 **Solution 1: Netlify Forms (MIỄN PHÍ - Recommended)**

### ✅ **Ưu điểm:**
- **Hoàn toàn miễn phí** cho 100 submissions/tháng
- **Dễ setup** - chỉ cần thêm attributes vào form
- **Dashboard đẹp** để xem responses
- **Email notifications** tự động
- **Export Excel/CSV** dễ dàng
- **Spam protection** built-in

### 🚀 **Setup:**
1. **Deploy website lên Netlify** (thay vì GitHub Pages)
2. **Form đã được setup sẵn** trong code với:
   - `data-netlify="true"`
   - `name="wedding-rsvp"`
   - Spam protection với honeypot

3. **Xem responses:**
   - Vào Netlify Dashboard → Forms → wedding-rsvp
   - Tự động nhận email khi có RSVP mới

### 💻 **Deploy steps:**
```bash
# 1. Tạo account Netlify.com
# 2. Connect GitHub repository
# 3. Deploy - Netlify tự động detect và setup forms
# 4. URL sẽ là: https://yoursite.netlify.app
```

---

## 🥈 **Solution 2: Formspree (MIỄN PHÍ)**

### ✅ **Ưu điểm:**
- **50 submissions/tháng miễn phí**
- **Hoạt động với GitHub Pages**
- **Email notifications**
- **Dashboard để xem data**

### 🚀 **Setup:**
1. **Tạo account tại formspree.io**
2. **Tạo form mới**, copy endpoint URL
3. **Update form action:**

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

4. **Xem responses** tại Formspree dashboard

---

## 🥉 **Solution 3: Google Forms (MIỄN PHÍ)**

### ✅ **Ưu điểm:**
- **Unlimited submissions**
- **Google Sheets integration** tự động
- **Familiar interface**
- **Advanced analytics**

### 🚀 **Setup:**
1. **Tạo Google Form** với các fields tương ứng
2. **Get form action URL** từ HTML source
3. **Update form** để submit tới Google:

```html
<form action="https://docs.google.com/forms/u/0/d/YOUR_FORM_ID/formResponse" method="POST">
```

4. **Xem responses** trong Google Sheets tự động

---

## 🏆 **Solution 4: EmailJS (MIỄN PHÍ)**

### ✅ **Ưu điểm:**
- **200 emails/tháng miễn phí**
- **Trực tiếp gửi email** cho bạn
- **No backend required**
- **Custom email templates**

### 🚀 **Setup:**
1. **Tạo account EmailJS.com**
2. **Setup email service** (Gmail, Outlook, etc.)
3. **Add JavaScript code:**

```javascript
// Thêm vào form submit handler
emailjs.send('service_id', 'template_id', {
    name: formData.guestName,
    email: formData.guestEmail,
    attendance: formData.attendance
});
```

---

## 📊 **So sánh các giải pháp:**

| Giải pháp | Giá | Submissions | Dashboard | Export | Ease |
|-----------|-----|-------------|-----------|---------|------|
| **Netlify** | Free | 100/tháng | ⭐⭐⭐⭐⭐ | ✅ | ⭐⭐⭐⭐⭐ |
| **Formspree** | Free | 50/tháng | ⭐⭐⭐⭐ | ✅ | ⭐⭐⭐⭐ |
| **Google Forms** | Free | Unlimited | ⭐⭐⭐ | ✅ | ⭐⭐⭐ |
| **EmailJS** | Free | 200/tháng | ⭐⭐ | ❌ | ⭐⭐⭐ |

## 🎯 **Khuyến nghị:**

### **Cho đám cưới (< 100 guests):**
**→ Sử dụng Netlify Forms**
- Dễ setup nhất
- Dashboard đẹp nhất
- Email notifications tự động
- Export Excel dễ dàng

### **Cho sự kiện lớn (> 100 guests):**
**→ Sử dụng Google Forms**
- Unlimited submissions
- Google Sheets integration
- Advanced analytics

## 🛠️ **Implementation sẵn:**

Form đã được setup sẵn cho **Netlify Forms**. Để switch sang giải pháp khác:

1. **Formspree:** Update `action` attribute
2. **Google Forms:** Map field names và update action URL
3. **EmailJS:** Add EmailJS script và update JavaScript

## 📈 **Tracking & Analytics:**

### **Data bạn sẽ nhận được:**
- ✅ Tên khách mời
- ✅ Email contact
- ✅ Xác nhận tham dự (Yes/No)
- ✅ Số lượng khách đi kèm
- ✅ Preference ăn uống
- ✅ Thời gian submit
- ✅ IP address (optional)

### **Export formats:**
- 📊 Excel (.xlsx)
- 📋 CSV
- 📧 Email notifications
- 📊 Google Sheets (tự động sync)

---

*Setup form processing chỉ mất 5-10 phút với bất kỳ giải pháp nào! 🚀*