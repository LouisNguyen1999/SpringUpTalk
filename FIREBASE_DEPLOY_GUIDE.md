# Hướng dẫn deploy React/Vite lên Firebase Hosting

Tài liệu này dùng cho SpringUpTalk và có thể áp dụng khi cần deploy ứng dụng lên một Firebase project mới trong tương lai.

## 1. Yêu cầu trước khi deploy

Máy cần có:

- Node.js và npm.
- Tài khoản Google có quyền truy cập Firebase project.
- Source code của ứng dụng.

Kiểm tra Node.js và npm:

```bash
node --version
npm --version
```

Cài Firebase CLI nếu máy chưa có:

```bash
npm install --global firebase-tools
```

Kiểm tra Firebase CLI:

```bash
firebase --version
```

## 2. Tạo Firebase project mới

1. Truy cập [Firebase Console](https://console.firebase.google.com/).
2. Chọn **Create a project** hoặc **Add project**.
3. Nhập tên hiển thị cho project, ví dụ `SpringUpTalk`.
4. Hoàn thành các bước tạo project.
5. Mở **Build > Hosting**, sau đó chọn **Get started** để bật Firebase Hosting.

### Lưu ý về Project ID

Tên hiển thị và Project ID không nhất thiết giống nhau:

- Tên hiển thị: `SpringUpTalk`
- Project ID: ví dụ `springuptalk`
- Website mặc định: `https://springuptalk.web.app`

Mọi lệnh Firebase CLI phải dùng **Project ID**, không dùng tên hiển thị.

Có thể xem Project ID tại **Project settings > General**, hoặc sau khi đăng nhập bằng lệnh:

```bash
firebase projects:list
```

## 3. Đăng nhập Firebase CLI

Tại terminal, chạy:

```bash
firebase login
```

Trình duyệt sẽ mở để đăng nhập tài khoản Google. Sau đó kiểm tra project có xuất hiện trong danh sách:

```bash
firebase projects:list
```

Nếu đang đăng nhập sai tài khoản hoặc phiên đăng nhập hết hạn:

```bash
firebase login --reauth
```

## 4. Cài dependencies của ứng dụng

Di chuyển vào thư mục project:

```bash
cd /duong-dan/toi/project
```

Nếu project có `package-lock.json`, nên dùng:

```bash
npm ci
```

Nếu chưa có `package-lock.json`, dùng:

```bash
npm install
```

## 5. Cấu hình Firebase Hosting

Project cần hai file ở thư mục gốc: `.firebaserc` và `firebase.json`.

### File `.firebaserc`

Thay `YOUR_FIREBASE_PROJECT_ID` bằng Project ID thực tế:

```json
{
  "projects": {
    "default": "YOUR_FIREBASE_PROJECT_ID"
  }
}
```

Ví dụ của SpringUpTalk:

```json
{
  "projects": {
    "default": "springuptalk"
  }
}
```

### File `firebase.json`

Cấu hình dưới đây dành cho React/Vite, React Router và PWA:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "cleanUrls": true,
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "/index.html",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache, no-store, must-revalidate"
          }
        ]
      },
      {
        "source": "/sw.js",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache"
          }
        ]
      },
      {
        "source": "/registerSW.js",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache"
          }
        ]
      },
      {
        "source": "/assets/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  }
}
```

Giải thích nhanh:

- `public: "dist"`: Firebase upload thư mục được Vite tạo ra.
- `rewrites`: giúp các URL của React Router vẫn hoạt động khi tải lại trang trực tiếp.
- `headers`: tránh giữ bản HTML hoặc service worker cũ, đồng thời cache lâu các asset đã được Vite đánh version.

> Nếu project đã có hai file cấu hình trên, không cần chạy lại `firebase init hosting`, vì thao tác init có thể thay đổi cấu hình hiện tại.

## 6. Kiểm tra `.gitignore`

Nên có các dòng sau để không commit cache và log của Firebase:

```gitignore
.firebase/
firebase-debug.log*
```

Không commit service-account key, file chứa mật khẩu hoặc token. Nếu ứng dụng dùng biến môi trường, nên ignore `.env` và chỉ commit `.env.example`.

## 7. Build ứng dụng

Chạy:

```bash
npm run build
```

Với SpringUpTalk, lệnh này thực hiện:

1. Kiểm tra dữ liệu nội dung.
2. Kiểm tra TypeScript.
3. Build ứng dụng bằng Vite vào thư mục `dist`.

Chỉ deploy khi build hoàn tất không có lỗi.

Có thể xem thử bản production trên máy trước khi deploy:

```bash
npm run preview -- --host
```

## 8. Deploy lên Firebase Hosting

Cách an toàn nhất là truyền Project ID trực tiếp để tránh deploy nhầm:

```bash
firebase deploy --only hosting --project YOUR_FIREBASE_PROJECT_ID
```

Ví dụ:

```bash
firebase deploy --only hosting --project springuptalk
```

Nếu `.firebaserc` đã đặt đúng project mặc định, có thể dùng lệnh ngắn hơn:

```bash
firebase deploy --only hosting
```

Khi thành công, Firebase CLI sẽ hiển thị:

- Project Console URL.
- Hosting URL dạng `https://PROJECT_ID.web.app`.

## 9. Quy trình deploy cho những lần cập nhật sau

Sau khi sửa code, chạy lần lượt:

```bash
npm run build
firebase deploy --only hosting --project YOUR_FIREBASE_PROJECT_ID
```

Với SpringUpTalk:

```bash
npm run build
firebase deploy --only hosting --project springuptalk
```

Sau deploy, kiểm tra ít nhất:

1. Trang chủ mở bình thường.
2. Một URL con mở trực tiếp và tải lại không bị lỗi `404`.
3. Giao diện hoạt động trên mobile.
4. Phiên bản mới xuất hiện sau khi refresh.

## 10. Deploy cùng source code sang một Firebase project khác

Giả sử muốn chuyển từ `springuptalk` sang Project ID mới là `springuptalk-v2`:

1. Tạo project `springuptalk-v2` trên Firebase Console và bật Hosting.
2. Kiểm tra project bằng `firebase projects:list`.
3. Build lại ứng dụng bằng `npm run build`.
4. Deploy trực tiếp sang project mới:

```bash
firebase deploy --only hosting --project springuptalk-v2
```

5. Nếu muốn project mới trở thành mặc định, đổi giá trị `default` trong `.firebaserc`:

```json
{
  "projects": {
    "default": "springuptalk-v2"
  }
}
```

Luôn kiểm tra Project ID trước khi deploy:

```bash
firebase use
```

## 11. Một số lỗi thường gặp

### `Failed to authenticate` hoặc yêu cầu đăng nhập lại

```bash
firebase login --reauth
```

### Không tìm thấy Firebase project

- Kiểm tra Project ID có chính xác không.
- Chạy `firebase projects:list`.
- Kiểm tra tài khoản Google hiện tại có quyền với project không.

### Deploy nhầm project

Kiểm tra `.firebaserc`, sau đó dùng lệnh có tham số rõ ràng:

```bash
firebase deploy --only hosting --project YOUR_FIREBASE_PROJECT_ID
```

### Tải lại URL con bị lỗi `404`

Kiểm tra `firebase.json` có rewrite sau:

```json
{
  "source": "**",
  "destination": "/index.html"
}
```

### Website vẫn hiển thị phiên bản cũ

- Refresh mạnh bằng `Ctrl + Shift + R`.
- Đóng và mở lại tab.
- Với ứng dụng PWA, có thể cần xóa cache hoặc unregister service worker trong DevTools.
- Xác nhận đã chạy lại `npm run build` trước khi deploy.

### Build thành công nhưng trang trắng

- Mở DevTools và xem lỗi trong Console/Network.
- Kiểm tra asset trong `dist` đã được tạo.
- Kiểm tra cấu hình đường dẫn `base` của Vite; khi deploy ở domain gốc thường dùng `/`.

## Checklist nhanh

```text
[ ] Đã tạo Firebase project và bật Hosting
[ ] Đã xác định đúng Project ID
[ ] Đã firebase login và nhìn thấy project trong firebase projects:list
[ ] .firebaserc trỏ đúng project
[ ] firebase.json dùng thư mục dist và có SPA rewrite
[ ] npm run build thành công
[ ] Deploy bằng --project để tránh nhầm project
[ ] Đã kiểm tra trang chủ và URL con sau deploy
```
