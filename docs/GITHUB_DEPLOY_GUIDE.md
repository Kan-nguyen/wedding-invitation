# 🚀 GitHub Deploy Script - Hướng dẫn sử dụng

## 📁 **File Location:**
```
dev-tools/github-deploy.sh
```

## 🎯 **Tại sao cần script này:**
- ✅ **Bảo mật token** - Token không bao giờ được lưu trữ
- ✅ **Tự động cleanup** - Xóa token sau khi dùng
- ✅ **Easy deployment** - Chỉ cần chạy 1 lệnh
- ✅ **Error handling** - Kiểm tra lỗi và hướng dẫn fix

## 🔑 **Bước 1: Tạo GitHub Personal Access Token**

### **1.1. Vào GitHub Settings:**
1. **GitHub.com** → Click avatar → Settings
2. **Developer settings** (sidebar cuối)
3. **Personal access tokens** → Tokens (classic)
4. **Generate new token (classic)**

### **1.2. Cấu hình Token:**
```
Token Settings:
├── Note: "Wedding Invitation Deploy"
├── Expiration: 90 days (hoặc custom)
└── Scopes: ✅ repo (check box này)
```

### **1.3. Copy Token:**
- **Generate token**
- **Copy token ngay** (chỉ hiện 1 lần!)
- **Format:** `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## 💻 **Bước 2: Sử dụng Script**

### **2.1. Mở Terminal:**
```bash
# Navigate to project folder
cd "/Users/kan/Library/Mobile Documents/com~apple~CloudDocs/Wedding/Thiệp Cưới Online"

# Check script có executable permission không
ls -la dev-tools/github-deploy.sh
```

### **2.2. Chạy Script:**
```bash
# Run deployment script
./dev-tools/github-deploy.sh
```

## 🖥️ **Bước 3: Theo dõi Process**

### **3.1. Script sẽ hiển thị:**
```
🎉 Wedding Invitation - GitHub Deploy Script
================================================

📝 Bước 1: Nhập GitHub Token
   (Token sẽ được ẩn và KHÔNG lưu trữ)

🔑 Nhập GitHub Personal Access Token: ************************
✅ Token đã được xác thực

📝 Bước 2: Cấu hình Git Remote
   Remote hiện tại: https://github.com/Kan-nguyen/wedding-invitation.git
✅ Đã cấu hình remote với token

📝 Bước 3: Chuẩn bị commit
   Tìm thấy thay đổi, đang add files...
   Nhập commit message (hoặc Enter để dùng default): 
✅ Đã commit changes

📝 Bước 4: Deploy lên GitHub
   Đang push code...
✅ Deploy thành công!

🌐 Website URLs:
   📁 Repository: https://github.com/Kan-nguyen/wedding-invitation
   🔧 Settings: https://github.com/Kan-nguyen/wedding-invitation/settings/pages
   🌍 Live Site: https://kan-nguyen.github.io/wedding-invitation/

📋 Next Steps:
   1. Vào Settings → Pages để enable GitHub Pages
   2. Chọn source: Deploy from a branch → main
   3. Website sẽ live trong 5-10 phút

📝 Bước 5: Cleanup bảo mật
✅ Đã khôi phục remote URL (token đã được xóa)
✅ Đã xóa token khỏi memory

🎉 Hoàn tất! Wedding invitation đã được deploy!
```

### **3.2. Nếu có lỗi:**
```
❌ Push thất bại. Có thể token không đúng hoặc không có quyền.
   Vui lòng kiểm tra:
   - Token có đúng không?
   - Token có quyền 'repo' không?
   - Repository tồn tại và bạn có quyền write?
```

## 🛠️ **Troubleshooting**

### **❌ "Permission denied":**
```bash
# Fix permissions
chmod +x dev-tools/github-deploy.sh
```

### **❌ "Not a git repository":**
```bash
# Chạy từ đúng thư mục
cd "/Users/kan/Library/Mobile Documents/com~apple~CloudDocs/Wedding/Thiệp Cưới Online"
pwd  # Verify location
```

### **❌ "Token validation failed":**
- Kiểm tra token đã copy đúng chưa
- Đảm bảo token có scope `repo`
- Token chưa expired

### **❌ "Remote repository not found":**
- Repository phải tồn tại trước: https://github.com/Kan-nguyen/wedding-invitation
- Tên repository phải chính xác
- Account phải có quyền access

## 🔐 **Tính năng Bảo mật**

### **✅ Script bảo vệ token:**
1. **Hidden input** - Token không hiển thị khi gõ
2. **Memory cleanup** - Xóa token khỏi biến môi trường
3. **Remote cleanup** - Xóa token khỏi git remote URL
4. **No logging** - Token không bao giờ được ghi file
5. **Offline only** - Script không upload anywhere

### **🔒 Best Practices:**
- ✅ Chỉ chạy script trên máy cá nhân
- ✅ Không share script với token đã nhập
- ✅ Xóa terminal history sau khi dùng
- ✅ Token expires tự động sau 90 ngày

## 📋 **Manual Alternative**

Nếu script không hoạt động, bạn có thể deploy manual:

```bash
# Set remote với token
git remote set-url origin https://YOUR_TOKEN@github.com/Kan-nguyen/wedding-invitation.git

# Push code
git add .
git commit -m "Deploy wedding invitation"
git push -u origin main

# Clean up
git remote set-url origin https://github.com/Kan-nguyen/wedding-invitation.git
```

## 🌐 **Sau khi Deploy thành công**

### **Enable GitHub Pages:**
1. **Vào:** https://github.com/Kan-nguyen/wedding-invitation/settings/pages
2. **Source:** Deploy from a branch
3. **Branch:** main
4. **Folder:** / (root)
5. **Save**

### **Website sẽ live tại:**
```
https://kan-nguyen.github.io/wedding-invitation/
```

### **Verification:**
- [ ] Repository có tất cả files
- [ ] GitHub Pages enabled
- [ ] Website load được
- [ ] Images hiển thị đúng
- [ ] Music hoạt động
- [ ] RSVP form work (nếu đã setup Google Sheets)

## 🔄 **Cập nhật Website sau này**

Để update website sau khi có thay đổi:

```bash
# Option 1: Chạy script lại
./dev-tools/github-deploy.sh

# Option 2: Manual Git
git add .
git commit -m "Update website content"
git push origin main
```

## 📞 **Help Command**

Script có built-in help:

```bash
# Show help
./dev-tools/github-deploy.sh --help
./dev-tools/github-deploy.sh -h
./dev-tools/github-deploy.sh help
```

## 🎉 **Ready to Deploy!**

**Script đã sẵn sàng sử dụng:**
1. ✅ Tạo GitHub Personal Access Token
2. ✅ Chạy script: `./dev-tools/github-deploy.sh`
3. ✅ Nhập token khi được hỏi
4. ✅ Website sẽ live trong vài phút!

**Deployment chỉ mất 2-3 phút!** 🚀