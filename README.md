# JFE Website

Website tĩnh luyện câu hỏi JFE/FE.

## Chạy trên máy
Mở `index.html` trực tiếp bằng trình duyệt, hoặc chạy:

```bash
python -m http.server 8000
```

Sau đó truy cập `http://localhost:8000`.

## Đưa lên GitHub Pages
1. Tạo repository mới trên GitHub.
2. Tải toàn bộ 4 file `index.html`, `style.css`, `app.js`, `questions.js` lên nhánh `main`.
3. Vào **Settings → Pages**.
4. Chọn **Deploy from a branch**, nhánh `main`, thư mục `/root`.

Tiến độ được lưu bằng `localStorage` của trình duyệt.
