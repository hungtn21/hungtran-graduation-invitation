# 🎓 Thiệp Mời Lễ Tốt Nghiệp — Website thiệp mời cá nhân hóa từng khách

Website thiệp mời điện tử: mỗi khách có **1 liên kết riêng** (`/thiep-moi/<slug>`). Khi mở, **màn nhung sân khấu** kéo ra và thiệp hiển thị đúng tên của họ, kèm thời gian, địa điểm, liên hệ, form xác nhận tham dự + viết lời chúc. Bạn theo dõi toàn bộ phản hồi tại trang quản trị **`/quan-ly`** (khóa bằng mã PIN).

## 🚀 Chạy trên máy (local)

Cần cài [Node.js](https://nodejs.org) (bản LTS, ≥ 18).

```bash
npm install   # cài thư viện (chỉ cần 1 lần)
npm run dev   # chạy tại http://localhost:5173
```

Link test mẫu:

- `http://localhost:5173/thiep-moi/tran-thi-b`
- `http://localhost:5173/thiep-moi/le-van-c`
- `http://localhost:5173/thiep-moi/pham-thi-d`
- Trang quản trị: `http://localhost:5173/quan-ly` (PIN mặc định `1234`)

## ✏️ Sửa nội dung thiệp

### Thông tin buổi lễ + liên hệ
Mở `src/data/guests.json`, sửa phần `event`:

| Trường | Ý nghĩa |
|---|---|
| `ownerName` | Tên của bạn (hiển thị trên thiệp) |
| `date`, `time` | Ngày (YYYY-MM-DD) và giờ bắt đầu buổi lễ |
| `venue`, `address` | Tên và địa chỉ địa điểm |
| `mapsUrl` | Link Google Maps (bấm nút "Xem bản đồ" sẽ mở link này) |
| `contact` | SĐT, Zalo, email của bạn (nút gọi/nhắn trên thiệp) |
| `dressCode` | Gợi ý trang phục (để trống nếu không cần) |

Ảnh sơ đồ trường hiển thị trên thiệp đặt tại `public/so-do-hust.jpg` — muốn đổi ảnh chỉ cần thay file này (giữ nguyên tên).

### Danh sách khách mời
Trong cùng file `src/data/guests.json`, mỗi khách là 1 object trong mảng `guests`:

```json
{ "slug": "nguyen-van-a", "name": "Nguyễn Văn A", "group": "Gia đình", "note": "..." }
```

- `slug`: mã dùng trong link — viết liền, không dấu, không khoảng trắng → link của khách là `/thiep-moi/nguyen-van-a`
- `name`: tên hiển thị trên thiệp
- `group`: nhóm khách (hiển thị ở trang quản trị)
- `note` (không bắt buộc): lời nhắn riêng chỉ hiện trên thiệp của khách đó

### Mã PIN + khóa bảo vệ
Mở `src/config.js`: sửa `adminPin` (PIN mở trang `/quan-ly`) và `readKey` (khóa đọc dữ liệu — phải khớp với `READ_KEY` trong Apps Script).

## 📊 Kết nối Google Sheets (lưu phản hồi & lời chúc)

### Bước 1 — Tạo Google Sheet
1. Vào [sheets.new](https://sheets.new) tạo bảng mới (bảng có thể để chế độ riêng tư — Apps Script chạy bằng quyền của bạn).
2. Sao chép **ID của sheet** trong link: `https://docs.google.com/spreadsheets/d/<ID-LÀ-PHẦN-NÀY>/edit`
3. Không cần tạo tab thủ công — lần đầu gửi phản hồi, Apps Script sẽ **tự tạo tab `PhanHoi` kèm dòng tiêu đề** (Slug | Tên | RSVP | Số người đi cùng | Lời chúc | Thời gian gửi).

### Bước 2 — Tạo Apps Script
1. Trong Google Sheet: menu **Tiện ích → Apps Script**.
2. Xóa code mẫu, **dán toàn bộ nội dung file `apps-script/Code.gs`** vào.
3. Sửa dòng `var SHEET_ID = 'PASTE_GOOGLE_SHEET_ID'` thành ID ở Bước 1.
4. Bấm **Deploy → New deployment** → biểu tượng bánh răng → chọn loại **Web app**:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Bấm **Deploy**, cho phép cấp quyền, rồi **sao chép URL Web app** (dạng `https://script.google.com/macros/s/.../exec`).

### Bước 3 — Dán URL vào website
Mở `src/config.js`, dán URL vào `appsScriptUrl: '...'`, lưu file. Xong! Khách gửi phản hồi sẽ hiện vào Google Sheet (gửi lại sẽ **ghi đè dòng cũ**, không bị trùng), trang `/quan-ly` đọc dữ liệu từ đó.

## 🎟️ Tạo link gửi cho từng khách

Sau khi deploy, link của mỗi khách là: `https://TEN-MIEN-CUA-BAN/thiep-moi/<slug>`

Mẹo: muốn in sẵn danh sách link, có thể nhờ tôi viết 1 script nhỏ tự sinh toàn bộ link từ `guests.json` để bạn copy gửi qua Zalo/Messenger.

## ☁️ Deploy lên Vercel (miễn phí)

1. Đưa thư mục này lên GitHub (kho mới, public/private đều được).
2. Vào [vercel.com](https://vercel.com) → **Add New → Project** → chọn kho GitHub vừa tạo → **Deploy** (Vercel tự nhận dự án Vite; file `vercel.json` đã cấu hình sẵn route).
3. Xong! Link dạng `https://ten-du-an.vercel.app`. Kiểm tra: `https://ten-du-an.vercel.app/thiep-moi/<slug>`.

## 🔒 Lưu ý bảo mật

- Trang `/quan-ly` dùng **mã PIN** ở `src/config.js` — mức bảo vệ cơ bản, đủ cho thiệp mời cá nhân (dữ liệu không nhạy cảm). **Hãy đổi PIN mặc định `1234`** trước khi gửi thiệp.
- `readKey` nằm trong code chạy trên trình duyệt nên người tinh ý vẫn có thể đọc được — nếu cần bảo mật nghiêm ngặt, hãy nâng cấp lên backend riêng (xem PLAN.md, Phương án B).

## 🛠️ Các lệnh

| Lệnh | Mô tả |
|---|---|
| `npm run dev` | Chạy local (có hot-reload) |
| `npm run build` | Build bản production ra thư mục `dist/` |
| `npm run preview` | Xem thử bản build vừa tạo |

## 📁 Cấu trúc thư mục

Xem cây thư mục chi tiết trong `PLAN.md` → mục 7. Tóm tắt:

- `src/data/guests.json` — nội dung thiệp + danh sách khách
- `src/config.js` — URL Apps Script, PIN, khóa đọc
- `src/components/` — StageCurtain (màn nhung), Countdown, EventInfo, ContactInfo, RsvpForm, Icon, Reveal
- `src/pages/` — Landing, InvitePage (trang thiệp), AdminPage (`/quan-ly`), NotFound
- `apps-script/Code.gs` — mã dán vào Google Apps Script
