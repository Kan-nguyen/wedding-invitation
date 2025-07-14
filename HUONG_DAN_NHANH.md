# 🚀 Hướng Dẫn Nhanh - Upload Website Thiệp Cưới

## 📍 Các Bước Chính (15 phút)

### 1️⃣ Tạo GitHub Repository (2 phút)
```
→ Vào github.com → Đăng nhập
→ New repository → Đặt tên (vd: wedding-minh-nguyet-anh-khoa)  
→ Chọn Public → Create repository
```

### 2️⃣ Upload Code (3 phút)
```bash
# Trong thư mục website, chạy:
git remote add origin https://github.com/USERNAME/TEN-REPOSITORY.git
git branch -M main  
git push -u origin main
```

### 3️⃣ Kích Hoạt GitHub Pages (2 phút)
```
→ Repository → Settings → Pages
→ Source: Deploy from branch → main → Save
→ Lấy URL: https://USERNAME.github.io/TEN-REPOSITORY
```

### 4️⃣ Mua Domain (5 phút)
**Khuyên dùng: Namecheap.com**
- Giá: ~$12/năm (.com)
- Tìm tên: `minguyetanhkhoa.com`
- Thanh toán bằng thẻ/PayPal

### 5️⃣ Kết Nối Domain (3 phút)

**Tại Namecheap (Domain DNS):**
```
Advanced DNS → Add Records:

Type: A, Host: @, Value: 185.199.108.153
Type: A, Host: @, Value: 185.199.109.153  
Type: A, Host: @, Value: 185.199.110.153
Type: A, Host: @, Value: 185.199.111.153
Type: CNAME, Host: www, Value: USERNAME.github.io
```

**Tại GitHub:**
```
Settings → Pages → Custom domain: minguyetanhkhoa.com → Save
Tick "Enforce HTTPS" (sau 30 phút)
```

---

## 🎯 Kết Quả
- ✅ Website live tại: `https://minguyetanhkhoa.com`
- ✅ Tự động có SSL (khóa xanh)
- ✅ Hoạt động trên mọi thiết bị
- ✅ Tốc độ nhanh, ổn định

## 💰 Chi Phí
- **GitHub Pages**: MIỄN PHÍ
- **Domain**: ~280k VNĐ/năm
- **SSL**: MIỄN PHÍ
- **Hosting**: MIỄN PHÍ

## 📱 Chia Sẻ Thiệp
1. Copy link: `https://minguyetanhkhoa.com`
2. Hoặc dùng QR code có sẵn trong website
3. Gửi qua Zalo/Facebook/SMS

---

## ⚡ Troubleshooting Nhanh

**❌ Domain không hoạt động?**
- Đợi 2-24h để DNS cập nhật
- Kiểm tra A records đã đúng chưa

**❌ Không có HTTPS?**  
- Đợi 30 phút sau khi DNS hoạt động
- Tắt rồi bật lại "Enforce HTTPS"

**❌ Website lỗi 404?**
- Check file `CNAME` trong repository
- Đảm bảo repository là Public

**❌ Cần thay đổi gì?**
- Sửa code → git add . → git commit -m "update" → git push
- Website tự động cập nhật sau 1-2 phút

---

## 📞 Hỗ Trợ
- **GitHub**: support.github.com
- **Namecheap**: Live chat 24/7
- **DNS Check**: dnschecker.org

**🎉 Chúc bạn thành công!**