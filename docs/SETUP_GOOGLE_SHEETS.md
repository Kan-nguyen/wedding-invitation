# 🎯 Setup Google Sheets RSVP - Hướng dẫn chi tiết

## 📋 **Bước 1: Tạo Google Form (5 phút)**

### **1.1. Tạo Form:**
1. Vào **forms.google.com**
2. **"+ Blank form"**
3. **Title:** "Wedding RSVP - Minh Nguyệt & Anh Khoa"
4. **Description:** "Vui lòng xác nhận tham dự đám cưới ngày 27/07/2025"

### **1.2. Thêm Fields theo thứ tự:**

```
📝 Question 1:
├── Title: "Họ và tên"
├── Type: Short answer
├── Required: YES
└── Placeholder: "Ví dụ: Nguyễn Văn An"

📝 Question 2:
├── Title: "Số điện thoại"
├── Type: Short answer
├── Required: YES
├── Placeholder: "0901 234 567"
└── Description: "Để chúng tôi có thể liên lạc khi cần thiết"

📝 Question 3:
├── Title: "Email (không bắt buộc)"
├── Type: Short answer
├── Required: NO
├── Placeholder: "email@example.com"
└── Description: "Chỉ điền nếu bạn muốn nhận thông tin cập nhật"

📝 Question 4:
├── Title: "Mối quan hệ với cô dâu chú rể"
├── Type: Multiple choice
├── Required: YES
└── Options:
    • Gia đình cô dâu
    • Gia đình chú rể
    • Bạn bè cô dâu
    • Bạn bè chú rể
    • Bạn chung
    • Đồng nghiệp
    • Khác

📝 Question 5:
├── Title: "Bạn có thể tham dự không?"
├── Type: Multiple choice
├── Required: YES
└── Options:
    • Có, tôi sẽ tham dự 💒
    • Không, tôi không thể tham dự 😢

📝 Question 6:
├── Title: "Số người tham dự (bao gồm bạn)"
├── Type: Multiple choice
├── Required: NO
└── Options: 1, 2, 3, 4, 5+

📝 Question 7:
├── Title: "Lựa chọn món ăn"
├── Type: Multiple choice
├── Required: NO
└── Options:
    • Thịt (Bò/Heo/Gà) 🥩
    • Hải sản (Tôm/Cua/Cá) 🦐
    • Chay (Không thịt/cá) 🥬

📝 Question 8:
├── Title: "Yêu cầu đặc biệt"
├── Type: Paragraph
├── Required: NO
└── Placeholder: "Dị ứng thực phẩm, yêu cầu đặc biệt khác..."

📝 Question 9:
├── Title: "Lời chúc cho cô dâu chú rể"
├── Type: Paragraph
├── Required: NO
└── Placeholder: "Gửi lời chúc tốt đẹp đến Minh Nguyệt & Anh Khoa..."
```

## 🔗 **Bước 2: Lấy Form Action URL**

### **2.1. Get Form URL:**
1. **Click "Send"** button (top right)
2. **Copy link**
3. **URL format:** `https://docs.google.com/forms/d/e/FORM_ID/viewform`

### **2.2. Convert to Action URL:**
```
From: https://docs.google.com/forms/d/e/1FAIpQLSc_ABC123.../viewform
To:   https://docs.google.com/forms/d/e/1FAIpQLSc_ABC123.../formResponse
```
**Chỉ cần thay `viewform` → `formResponse`**

## 🔍 **Bước 3: Lấy Entry Numbers**

### **3.1. Inspect Form HTML:**
1. **Mở Google Form** (viewform URL)
2. **Right click** → "Inspect Element" (F12)
3. **Tìm input names** trong HTML:

```html
<!-- Example HTML you'll see: -->
<input name="entry.2005620554" ... > <!-- Họ tên -->
<input name="entry.1045781291" ... > <!-- SĐT -->
<input name="entry.1166974658" ... > <!-- Email -->
<input name="entry.839337160" ... >  <!-- Quan hệ -->
<input name="entry.1404042694" ... > <!-- Tham dự -->
<!-- etc... -->
```

### **3.2. Map Entry Numbers:**
```javascript
// Your mapping will look like:
"entry.2005620554" → Họ và tên
"entry.1045781291" → Số điện thoại  
"entry.1166974658" → Email
"entry.839337160"  → Mối quan hệ
"entry.1404042694" → Tham dự không
"entry.1065046570" → Số người tham dự
"entry.1537031534" → Món ăn
"entry.987654321"  → Yêu cầu đặc biệt
"entry.123456789"  → Lời chúc
```

## 💻 **Bước 4: Update Website Code**

### **4.1. Replace Form Action:**
Trong `index.html`, tìm và thay:

```html
<!-- OLD -->
<form class="rsvp-form" id="rsvpForm" name="wedding-rsvp" method="POST" data-netlify="true">

<!-- NEW -->
<form class="rsvp-form" id="rsvpForm" 
      action="https://docs.google.com/forms/d/e/YOUR_ACTUAL_FORM_ID/formResponse" 
      method="POST" 
      target="hidden_iframe">
```

### **4.2. Add Hidden Iframe:**
Thêm vào cuối body:

```html
<!-- Hidden iframe để handle submission -->
<iframe name="hidden_iframe" id="hidden_iframe" style="display:none;"></iframe>
```

### **4.3. Update Field Names:**
Thay tất cả `name` attributes:

```html
<!-- Example updates -->
<input name="guestName" → name="entry.2005620554">
<input name="guestPhone" → name="entry.1045781291">
<input name="guestEmail" → name="entry.1166974658">
<!-- etc... -->
```

### **4.4. Add Success Handler:**
Thêm JavaScript:

```javascript
document.getElementById('hidden_iframe').addEventListener('load', function() {
    // Show success message
    document.getElementById('rsvpForm').style.display = 'none';
    document.getElementById('rsvpSuccess').style.display = 'block';
});
```

## 📊 **Bước 5: Verify Google Sheets**

### **5.1. Check Sheets:**
1. **Vào Google Form** → Responses tab
2. **Click green Sheets icon** 
3. **Form responses** sẽ tự động tạo Google Sheets
4. **Mỗi submission** = 1 row mới

### **5.2. Sample Data Format:**
```
| Timestamp | Họ tên | SĐT | Email | Quan hệ | Tham dự | Số khách | Món ăn | Yêu cầu | Lời chúc |
|-----------|--------|-----|-------|---------|---------|----------|--------|---------|-----------|
| 25/7 14:30| Nguyễn An |0901234567| an@email.com | Bạn bè chú rể | Có, tôi sẽ tham dự | 2 | Thịt | | Chúc hạnh phúc! |
| 25/7 15:45| Trần Hương |0987654321| | Gia đình cô dâu | Không, tôi không thể | | | Xa nhà | Chúc 2 bạn hạnh phúc |
```

## 🔔 **Bước 6: Setup Notifications**

### **6.1. Email Alerts:**
1. **Google Sheets** → Tools → Notification settings
2. **"Any changes are made"**
3. **Email frequency:** Immediately
4. **Save** → Nhận email mỗi khi có RSVP!

### **6.2. Share với Family:**
1. **Click "Share"** button
2. **Add email addresses** của gia đình
3. **Permission:** Viewer or Editor
4. **Send** → Mọi người có thể xem real-time!

## 📈 **Bước 7: Analytics & Reports**

### **7.1. Auto Calculations:**
Thêm formulas vào sheet:

```javascript
// Cell L1: Total Attending
=COUNTIF(F:F,"Có*")

// Cell L2: Total Not Attending  
=COUNTIF(F:F,"Không*")

// Cell L3: Total Guests
=SUMIF(F:F,"Có*",G:G)

// Cell L4: Response Rate
=COUNTA(A:A)-1 & " responses"
```

### **7.2. Pivot Tables:**
1. **Data** → Pivot table
2. **Rows:** Relationship 
3. **Values:** Count of Attendance
4. **Filters:** Attending = "Có"

### **7.3. Charts:**
- **Pie chart:** Attending vs Not Attending
- **Bar chart:** Responses by Relationship  
- **Timeline:** Response rate over time

## ✅ **Bước 8: Test Complete Flow**

### **8.1. Test Checklist:**
- [ ] Submit test RSVP through website
- [ ] Check data appears in Google Sheets
- [ ] Verify email notification received
- [ ] Test all form fields work correctly
- [ ] Confirm success message shows
- [ ] Export Excel file works

### **8.2. Sample Test:**
```
Test Data:
├── Tên: "Test User"
├── SĐT: "0901234567"  
├── Email: "test@email.com"
├── Quan hệ: "Bạn bè chú rể"
├── Tham dú: "Có"
├── Số khách: "2"
├── Món ăn: "Thịt"
├── Yêu cầu: "Test entry"
└── Lời chúc: "Chúc test thành công!"
```

## 🎉 **Result: Perfect RSVP System!**

### **What You'll Have:**
✅ **Real-time RSVP tracking** in Google Sheets  
✅ **Email notifications** for each submission  
✅ **Easy sharing** with family members  
✅ **Excel export** anytime you need  
✅ **Advanced analytics** with charts & pivots  
✅ **Mobile-friendly** form experience  
✅ **100% FREE** - no limits on responses  

### **Daily Workflow:**
1. **Morning:** Check overnight RSVPs in email
2. **Midday:** Review Google Sheets for updates  
3. **Evening:** Share daily count with family
4. **Weekly:** Export report for venue/catering

**Setup time: ~15 minutes**  
**Maintenance: 0 minutes** (fully automated!)

🚀 **Your wedding RSVP system is now enterprise-grade!** 🎊