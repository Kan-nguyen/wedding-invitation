# 🚀 Hướng Dẫn Deploy Website Thiệp Cưới

## 📋 Mục Lục
1. [Upload lên GitHub](#1-upload-lên-github)
2. [Thiết lập GitHub Pages](#2-thiết-lập-github-pages)
3. [Mua tên miền](#3-mua-tên-miền)
4. [Kết nối tên miền với GitHub Pages](#4-kết-nối-tên-miền-với-github-pages)
5. [Thiết lập SSL](#5-thiết-lập-ssl)
6. [Kiểm tra và tối ưu](#6-kiểm-tra-và-tối-ưu)

---

## 1. Upload lên GitHub

### Bước 1.1: Tạo Repository trên GitHub
1. Truy cập [github.com](https://github.com) và đăng nhập
2. Nhấn nút **"New"** hoặc **"+"** → **"New repository"**
3. Đặt tên repository (ví dụ: `wedding-invitation` hoặc `minh-nguyet-anh-khoa`)
4. Chọn **Public** (để sử dụng GitHub Pages miễn phí)
5. **KHÔNG** tick "Add a README file" (vì đã có sẵn)
6. Nhấn **"Create repository"**

### Bước 1.2: Upload code từ máy tính
Mở Terminal/Command Prompt trong thư mục website và chạy:

```bash
# Thêm remote repository
git remote add origin https://github.com/[USERNAME]/[REPOSITORY-NAME].git

# Đổi tên branch thành main (nếu cần)
git branch -M main

# Push code lên GitHub
git push -u origin main
```

**Thay thế:**
- `[USERNAME]`: Tên GitHub của bạn
- `[REPOSITORY-NAME]`: Tên repository vừa tạo

### Bước 1.3: Kiểm tra upload thành công
- Refresh trang GitHub repository
- Bạn sẽ thấy tất cả files đã được upload

---

## 2. Thiết lập GitHub Pages

### Bước 2.1: Kích hoạt GitHub Pages
1. Trong repository GitHub, nhấn tab **"Settings"**
2. Scroll xuống phần **"Pages"** (bên trái)
3. Trong **"Source"**, chọn **"Deploy from a branch"**
4. Chọn **"main"** branch
5. Chọn **"/ (root)"** folder
6. Nhấn **"Save"**

### Bước 2.2: Lấy URL website
- GitHub sẽ tạo URL: `https://[USERNAME].github.io/[REPOSITORY-NAME]`
- Website sẽ live sau 2-5 phút
- URL này sẽ hiển thị ở phần Pages settings

---

## 3. Mua Tên Miền

### Tại Việt Nam - Các nhà cung cấp uy tín:

#### 🥇 **Tenten.vn** (Khuyên dùng cho .com.vn)
- **Website**: [tenten.vn](https://tenten.vn)
- **Giá**: ~200.000 VNĐ/năm (.com.vn)
- **Ưu điểm**: Hỗ trợ tiếng Việt, thanh toán dễ dàng

#### 🥇 **P.A Vietnam** 
- **Website**: [pavietnam.vn](https://pavietnam.vn)
- **Giá**: ~180.000 VNĐ/năm (.com.vn)
- **Ưu điểm**: Giá tốt, interface đơn giản

#### 🥇 **Nhân Hòa**
- **Website**: [nhanhoa.com](https://nhanhoa.com)
- **Giá**: ~250.000 VNĐ/năm (.com.vn)
- **Ưu điểm**: Hỗ trợ 24/7, dịch vụ tốt

### Quốc tế - Giá rẻ hơn:

#### 🌟 **Namecheap** (Khuyên dùng nhất)
- **Website**: [namecheap.com](https://namecheap.com)
- **Giá**: ~$10-15/năm (.com)
- **Ưu điểm**: Giá rẻ, WHOIS privacy miễn phí

#### 🌟 **Cloudflare**
- **Website**: [cloudflare.com](https://cloudflare.com)
- **Giá**: Giá gốc (no markup) ~$8-12/năm
- **Ưu điểm**: Không lợi nhuận từ domain, DNS nhanh

#### **GoDaddy**
- **Website**: [godaddy.com](https://godaddy.com)
- **Giá**: ~$12-20/năm
- **Ưu điểm**: Nổi tiếng, nhiều tính năng

### Gợi ý tên miền:
```
minguyetanhkhoa.com
minguyetanhkhoa2025.com
weddingmn-ak.com
thieptruc-tuyenamn.com
love-minguyetanhkhoa.com
```

---

## 4. Kết Nối Tên Miền với GitHub Pages

### Bước 4.1: Thiết lập DNS tại nhà cung cấp domain

#### Cho Subdomain (ví dụ: www.domain.com):
Tạo **CNAME record**:
```
Type: CNAME
Name: www
Value: [USERNAME].github.io
TTL: 3600 (1 hour)
```

#### Cho Root domain (ví dụ: domain.com):
Tạo **A records**:
```
Type: A
Name: @ (hoặc để trống)
Value: 185.199.108.153
TTL: 3600

Type: A  
Name: @ (hoặc để trống)
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @ (hoặc để trống) 
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @ (hoặc để trống)
Value: 185.199.111.153  
TTL: 3600
```

**Và thêm CNAME cho www:**
```
Type: CNAME
Name: www
Value: [USERNAME].github.io
TTL: 3600
```

### Bước 4.2: Thiết lập trên GitHub
1. Vào **Settings** → **Pages** của repository
2. Trong **"Custom domain"**, nhập tên miền (ví dụ: `minguyetanhkhoa.com`)
3. Nhấn **"Save"**
4. Tick **"Enforce HTTPS"** (sau khi SSL được thiết lập)

### Bước 4.3: Tạo file CNAME (tự động)
GitHub sẽ tự động tạo file `CNAME` trong repository với nội dung tên miền của bạn.

---

## 5. Thiết Lập SSL (HTTPS)

### GitHub Pages tự động:
- GitHub sẽ tự động tạo SSL certificate từ Let's Encrypt
- Quá trình này mất 15-30 phút sau khi DNS propagate
- Tick **"Enforce HTTPS"** trong Settings → Pages

### Kiểm tra SSL:
- Truy cập `https://domain.com`
- Xem icon khóa màu xanh trên browser
- Test tại [ssllabs.com/ssltest](https://ssllabs.com/ssltest)

---

## 6. Kiểm Tra và Tối Ưu

### Bước 6.1: Kiểm tra website hoạt động
```bash
# Kiểm tra DNS đã propagate chưa
nslookup domain.com

# Ping domain
ping domain.com

# Kiểm tra HTTP/HTTPS
curl -I https://domain.com
```

### Bước 6.2: Test trên các thiết bị
- ✅ Mobile (iPhone, Android)
- ✅ Tablet (iPad, Android)  
- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tốc độ loading: [pagespeed.web.dev](https://pagespeed.web.dev)

### Bước 6.3: SEO cơ bản
Thêm vào `<head>` trong `index.html`:

```html
<!-- Open Graph cho social sharing -->
<meta property="og:title" content="Thiệp Cưới Minh Nguyệt & Anh Khoa">
<meta property="og:description" content="Trân trọng kính mời bạn tham dự lễ cưới của chúng tôi - 27/07/2025">
<meta property="og:image" content="https://domain.com/PNG/main.jpeg">
<meta property="og:url" content="https://domain.com">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Thiệp Cưới Minh Nguyệt & Anh Khoa">
<meta name="twitter:description" content="Trân trọng kính mời bạn tham dự lễ cưới của chúng tôi">
<meta name="twitter:image" content="https://domain.com/PNG/main.jpeg">
```

---

## 💰 Chi Phí Ước Tính

| Dịch vụ | Giá/năm | Ghi chú |
|---------|---------|---------|
| **Domain .com** (Namecheap) | ~$12 (~280k VNĐ) | Khuyên dùng |
| **Domain .com.vn** (Tenten) | ~200k VNĐ | Cho thị trường VN |
| **GitHub Pages** | **MIỄN PHÍ** | Hosting unlimited |
| **SSL Certificate** | **MIỄN PHÍ** | Let's Encrypt auto |
| **DNS** | **MIỄN PHÍ** | GitHub cung cấp |

**💡 Tổng chi phí: ~$12-15/năm (280-350k VNĐ/năm)**

---

## 📞 Hỗ Trợ Thêm

### Các vấn đề thường gặp:

#### 🔧 DNS không hoạt động:
- Đợi 24-48h để DNS propagate hoàn toàn
- Kiểm tra lại A records và CNAME
- Xóa cache DNS: `ipconfig /flushdns` (Windows) hoặc `sudo dscacheutil -flushcache` (Mac)

#### 🔧 Website không load:
- Kiểm tra file `CNAME` trong repository
- Đảm bảo repository là Public
- Check GitHub Pages status: [status.github.com](https://status.github.com)

#### 🔧 SSL không hoạt động:
- Đợi 30 phút sau khi DNS hoạt động
- Tắt "Enforce HTTPS", đợi 5 phút, rồi bật lại
- Kiểm tra DNS CAA records không block Let's Encrypt

### Liên hệ support:
- **GitHub Support**: [support.github.com](https://support.github.com)
- **Namecheap Support**: 24/7 live chat
- **Cloudflare Support**: [support.cloudflare.com](https://support.cloudflare.com)

---

## ✅ Checklist Hoàn Thành

- [ ] Repository đã tạo và upload code
- [ ] GitHub Pages đã kích hoạt  
- [ ] Domain đã mua và thiết lập DNS
- [ ] Custom domain đã cấu hình trên GitHub
- [ ] SSL certificate đã hoạt động (HTTPS)
- [ ] Website test OK trên mobile & desktop
- [ ] QR code đã tạo và share được
- [ ] Backup toàn bộ code

**🎉 Hoàn thành! Website thiệp cưới đã sẵn sàng!**

---

*Tạo bởi Claude Code - Chúc mừng hạnh phúc! 💕*