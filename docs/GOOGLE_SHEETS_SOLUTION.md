# 📊 Google Sheets RSVP Solution - SIÊU ĐỠN GIẢN

## 🎯 **Tại sao Google Sheets là tốt nhất:**

✅ **MIỄN PHÍ 100%** - Không giới hạn responses  
✅ **TỰ ĐỘNG** - Form submit → Sheets update ngay lập tức  
✅ **DỄ CHIA SẺ** - Share với gia đình để cùng xem  
✅ **EXCEL READY** - Export Excel bất cứ lúc nào  
✅ **THÔNG BÁO EMAIL** - Tự động báo khi có RSVP mới  
✅ **PHÂN TÍCH DỄ** - Pivot tables, charts, filters  

## 🚀 **Setup trong 5 phút:**

### **Bước 1: Tạo Google Form**
1. Vào **forms.google.com**
2. **Tạo form mới** → "Wedding RSVP"
3. **Thêm các fields** theo thứ tự:

```
📝 Form Fields Setup:
┌─────────────────────────────────────┐
│ 1. Họ và tên *                      │
│    Type: Short answer               │
│    Required: Yes                    │
├─────────────────────────────────────┤
│ 2. Số điện thoại *                  │
│    Type: Short answer               │
│    Required: Yes                    │
├─────────────────────────────────────┤
│ 3. Email                            │
│    Type: Short answer               │
│    Required: No                     │
├─────────────────────────────────────┤
│ 4. Mối quan hệ với cô dâu chú rể *  │
│    Type: Multiple choice            │
│    Options:                         │
│    • Gia đình cô dâu               │
│    • Gia đình chú rể               │
│    • Bạn bè cô dâu                 │
│    • Bạn bè chú rể                 │
│    • Bạn chung                     │
│    • Đồng nghiệp                   │
│    • Khác                          │
├─────────────────────────────────────┤
│ 5. Bạn có thể tham dự không? *      │
│    Type: Multiple choice            │
│    Options:                         │
│    • Có, tôi sẽ tham dự 💒        │
│    • Không, tôi không thể tham dự 😢│
├─────────────────────────────────────┤
│ 6. Số người tham dự (bao gồm bạn)   │
│    Type: Multiple choice            │
│    Options: 1, 2, 3, 4, 5+         │
├─────────────────────────────────────┤
│ 7. Lựa chọn món ăn                  │
│    Type: Multiple choice            │
│    Options:                         │
│    • Thịt (Bò/Heo/Gà)              │
│    • Hải sản (Tôm/Cua/Cá)          │
│    • Chay (Không thịt/cá)           │
├─────────────────────────────────────┤
│ 8. Yêu cầu đặc biệt                 │
│    Type: Paragraph                  │
│    Required: No                     │
├─────────────────────────────────────┤
│ 9. Lời chúc cho cô dâu chú rể        │
│    Type: Paragraph                  │
│    Required: No                     │
└─────────────────────────────────────┘
```

### **Bước 2: Lấy Form URL**
1. **Click "Send"** ở góc phải
2. **Copy link** để embed
3. **URL sẽ dạng:** `https://docs.google.com/forms/d/e/FORM_ID/viewform`

### **Bước 3: Update Website Form**
Thay thế form action trong `index.html`:

```html
<!-- Thay đổi dòng này -->
<form class="rsvp-form" id="rsvpForm" 
      action="https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse" 
      method="POST" target="hidden_iframe">
```

### **Bước 4: Map Field Names**
Inspect Google Form HTML để lấy field names:

```javascript
// Field mapping (sẽ khác cho mỗi form)
name="entry.123456789"  // Họ và tên
name="entry.987654321"  // Số điện thoại
name="entry.555666777"  // Email
// ... etc
```

## 🛠️ **Implementation Code**

Tôi sẽ tạo code tự động map với Google Form:

```html
<!-- Hidden iframe để handle form submission -->
<iframe name="hidden_iframe" id="hidden_iframe" style="display:none;"></iframe>

<form class="rsvp-form" id="rsvpForm" 
      action="https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse" 
      method="POST" 
      target="hidden_iframe">
      
    <div class="form-group">
        <label for="guestName">Họ và tên *</label>
        <input type="text" id="guestName" 
               name="entry.REPLACE_WITH_ACTUAL_ENTRY" 
               required placeholder="Ví dụ: Nguyễn Văn An">
    </div>
    
    <!-- ... other fields ... -->
    
    <button type="submit" class="rsvp-submit-btn">
        <span class="btn-text">Gửi xác nhận</span>
        <span class="btn-icon">💌</span>
    </button>
</form>

<script>
// Handle successful submission
document.getElementById('hidden_iframe').onload = function() {
    // Show success message
    document.getElementById('rsvpForm').style.display = 'none';
    document.getElementById('rsvpSuccess').style.display = 'block';
};
</script>
```

## 📊 **Google Sheets Dashboard Tự Động**

Sau khi setup, bạn sẽ có:

### **Sheet tự động với columns:**
```
| Timestamp | Họ tên | SĐT | Email | Quan hệ | Tham dự | Số khách | Món ăn | Yêu cầu | Lời chúc |
|-----------|--------|-----|-------|---------|---------|----------|--------|---------|-----------|
```

### **Auto-calculations:**
```javascript
// Thêm formulas này vào sheet:
=COUNTIF(E:E,"Có*")           // Số người tham dự
=COUNTIF(E:E,"Không*")        // Số người không tham dự
=SUMIF(E:E,"Có*",F:F)         // Tổng số khách
```

### **Charts tự động:**
- Pie chart: Attending vs Not Attending
- Bar chart: Responses by Relationship
- Timeline: Response rate over time

## 🔔 **Email Notifications**

### **Setup thông báo tự động:**
1. **Google Sheets** → Tools → Notification settings
2. **Choose:** "Any changes are made"
3. **Email frequency:** Immediately
4. **Nhận email** mỗi khi có RSVP mới!

### **Advanced: Apps Script Notification**
Tạo custom email với thông tin chi tiết:

```javascript
function sendRSVPNotification() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const data = sheet.getRange(lastRow, 1, 1, 10).getValues()[0];
  
  const emailBody = `
🎉 RSVP Mới Nhận Được!

👤 Tên: ${data[1]}
📞 SĐT: ${data[2]}
👥 Quan hệ: ${data[4]}
✅ Tham dự: ${data[5]}
🍽️ Món ăn: ${data[7]}

💌 Lời chúc: ${data[9]}

---
Tổng RSVP đến nay: ${lastRow - 1}
  `;
  
  MailApp.sendEmail(
    'your-email@gmail.com',
    '💒 RSVP Mới - Wedding Invitation',
    emailBody
  );
}
```

## 📱 **Mobile-Friendly Features**

### **Google Forms tự động responsive:**
- ✅ Touch-optimized controls
- ✅ Auto-complete suggestions  
- ✅ Mobile keyboard optimization
- ✅ Progress indicators
- ✅ Offline submission queue

## 🎯 **Workflow Hoàn Chỉnh**

### **Ngày deploy website:**
1. ✅ Tạo Google Form (5 phút)
2. ✅ Update website với form action
3. ✅ Test submission
4. ✅ Setup email notifications

### **Hàng ngày:**
- 📧 **Nhận email** khi có RSVP mới
- 📊 **Check Google Sheets** để xem tổng quan
- 📞 **Follow up** những người chưa respond

### **Hàng tuần:**
- 📈 **Export Excel** để share với venue
- 📊 **Update planning** dựa trên headcount
- 💌 **Send reminders** to non-responders

### **1 tuần trước wedding:**
- 📋 **Final headcount** export
- 🍽️ **Meal preferences** summary for catering
- ♿ **Special requirements** list for venue

## 💡 **Pro Tips**

### **Data Analysis:**
```javascript
// Useful formulas trong Google Sheets:
=COUNTIFS(E:E,"Có*",D:D,"Gia đình*")    // Family members attending
=COUNTIFS(E:E,"Có*",G:G,"Thịt")         // Meat preference count
=AVERAGE(F:F)                           // Average party size
```

### **Conditional Formatting:**
- 🟢 Green highlight for "Attending"
- 🔴 Red highlight for "Not Attending"
- 🟡 Yellow for "No Response"

### **Data Validation:**
- Phone format: `(###) ###-####`
- Email validation built-in
- Required field enforcement

## 🎉 **Ready-to-Use Solution**

Tôi sẽ tạo sẵn một template form và code để bạn chỉ cần:

1. **Copy Google Form template**
2. **Replace form action trong code**  
3. **Deploy website**
4. **Nhận RSVP responses tự động!**

**Đơn giản nhất có thể! 🚀**