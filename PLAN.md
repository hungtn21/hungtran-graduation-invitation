# KẾ HOẠCH PHÁT TRIỂN — WEBSITE THIỆP MỜI LỄ TỐT NGHIỆP

> Tài liệu này là bản kế hoạch để bạn review trước khi bắt đầu code.
> Sau khi duyệt, bạn trả lời các câu hỏi ở mục 9, tôi sẽ bắt đầu triển khai theo mục 8.

---

### 📝 Nhật ký cập nhật

| Ngày | Thay đổi |
|---|---|
| 2026-09-13 | **Bỏ hiệu ứng "phong bì mở thư"** theo phản hồi của bạn (trùng phong cách web của bạn bạn). ✅ **Đã chốt thay thế**: hiệu ứng **"Màn nhung sân khấu"** — hai tấm màn nhung kéo ra 2 bên như sân khấu lễ tốt nghiệp, ánh đèn rọi vào thiệp. |
| 2026-09-13 | **Bổ sung route quản trị `/quan-ly`** theo yêu cầu: xem ai đã xác nhận tham dự + đọc lời chúc của từng khách, bảo vệ bằng mã PIN. Loại Formspree khỏi phương án lưu RSVP (không đọc lại được dữ liệu). |
| 2026-09-13 | ✅ **Chốt các quyết định chính:** Công nghệ **React + Vite** · Phong cách **B — Tối giản (kem–xanh rêu)** · Lưu RSVP **Google Sheets** · Deploy **Vercel**. Bắt đầu triển khai. |
| 2026-09-13 | 🎨 **Đổi palette theo yêu cầu:** chuyển sang **sang trọng cao cấp — kem ngà + đỏ tía HUST (Đại học Bách khoa Hà Nội) + vàng gold**. Màn nhung sân khấu đổi thành nhung đỏ tía viền vàng. |
| 2026-09-13 | 🔤 **Đổi font theo yêu cầu "hiện đại hơn, bo tròn hơn":** tiêu đề dùng **Quicksand**, nội dung dùng **Nunito** (thay Be Vietnam Pro + Cormorant Garamond). |

---

## 1. Tổng quan & Mục tiêu

Xây dựng một trang web **thiệp mời điện tử** cho Lễ Tốt Nghiệp của bạn. Điểm đặc biệt:

- **Mỗi khách mời có một đường link riêng** (1 người = 1 route). Khi mở link, thiệp hiển thị đúng tên của người đó → cảm giác "thiệp này được gửi riêng cho mình".
- Khách có thể **xác nhận tham dự / không tham dự** và **viết lời chúc** ngay trên thiệp.
- Bạn có **trang quản trị riêng** (`/quan-ly`, khóa bằng mã PIN) để xem ai đã xác nhận tham dự và đọc lời chúc của từng người.
- Giao diện đẹp, hiện đại, **mobile-first** (đa số khách mở bằng điện thoại).

**Ví dụ link:** `https://tên-miền-của-bạn/thiep-moi/nguyen-van-a` — mỗi khách một link như vậy.

---

## 2. Nghiên cứu thị trường (đã tham khảo)

### Xu hướng quốc tế
| Yếu tố | Ghi nhận từ thị trường |
|---|---|
| **Phong bì mở thư động (animated envelope)** | Là xu hướng phổ biến nhất của thiệp điện tử cao cấp (Greenvelope, InviteDrop, Destiny Invitations): bấm mở nắp thư, dấu sáp vỡ, thiệp trượt ra. *(❌ Không áp dụng — trùng phong cách web của bạn; đã bỏ, xem nhật ký cập nhật)* |
| **Mobile-first** | Khách mở thiệp chủ yếu trên điện thoại — thiết kế dọc, chữ to, nút bấm lớn. |
| **RSVP ngay trên thiệp** | Nút Yes/No một chạm, kèm câu hỏi phụ (số người đi cùng, lời nhắn), theo dõi phản hồi theo thời gian thực (Greenvelope, Paperless Post, Evite). |
| **Hiệu ứng & cảm xúc** | Confetti khi xác nhận, nhạc nền (có nút tắt), đếm ngược tới ngày lễ, album ảnh. |
| **Đúng giờ, đủ thông tin** | Đặt ngay đầu thiệp: ngày giờ + múi giờ, địa điểm, link bản đồ, dress code, hạn chót RSVP. |

### Thị trường Việt Nam
- Các nền tảng nội địa như **Zenlove.me**, **Trao Thiệp**, **Penci** đều theo công thức chung: thiệp responsive + **Google Maps** + **form RSVP** + **album ảnh** + **nhạc nền** + chia sẻ qua link.
- Phong cách phổ biến cho thiệp tốt nghiệp (tổng hợp từ Lemon8 & các mẫu thiệp):
  - **Trang trọng:** tông đen – vàng – xanh đậm, font serif (mũ tốt nghiệp, hoa văn cổ điển).
  - **Tối giản:** nền trắng/kem, ít chi tiết, sang trọng.
  - **Dễ thương:** pastel, icon mây/sao/hoa (phù hợp nếu khách mời trẻ).

### Điểm khác biệt của dự án này
Các nền tảng trên thường gửi **cùng một thiệp** cho nhiều người. Dự án này mạnh hơn ở chỗ **cá nhân hóa theo từng khách** (route riêng + tên riêng + có thể thêm lời nhắn riêng theo nhóm), vẫn miễn phí và do bạn tự làm chủ.
Đồng thời màn mở thiệp dùng **"màn nhung sân khấu"** thay vì phong bì — vừa đúng chất buổi lễ tốt nghiệp trên sân khấu, vừa không trùng với các web thiệp phong bì phổ biến (bao gồm web của bạn bạn).

---

## 3. Yêu cầu chức năng

| # | Chức năng | Mô tả | Bắt buộc? |
|---|---|---|---|
| 1 | Route riêng từng khách | `/thiep-moi/<ma-khach>` — mỗi mã ứng với 1 người trong danh sách | ✅ |
| 2 | Tên người nhận | Thiệp hiển thị "Thân mời: `<Tên khách>`" | ✅ |
| 3 | Thời gian | Ngày, giờ, thứ trong tuần, kèm đồng hồ đếm ngược (countdown) | ✅ |
| 4 | Địa điểm | Tên địa điểm, địa chỉ, nút "Xem bản đồ" (Google Maps) | ✅ |
| 5 | Thông tin liên hệ của bạn | SĐT (bấm để gọi), Zalo/Facebook/email | ✅ |
| 6 | Xác nhận tham dự | 2 nút: "Tôi sẽ tham dự" / "Tiếc quá, không đến được" | ✅ |
| 8 | Viết lời chúc | Ô nhập lời chúc gửi đến bạn | ✅ |
| 9 | Lưu phản hồi | Mọi phản hồi lưu về 1 nơi để bạn xem (Google Sheets) | ✅ |
| 10 | Hiệu ứng màn nhung sân khấu | Màn nhung kéo ra 2 bên + ánh đèn sân khấu lộ thiệp, confetti khi xác nhận | ✅ |
| 11 | Trang 404 thân thiện | Link sai/thiếu người → màn hình "Thiệp không tồn tại" dễ thương | ✅ |
| 12 | Nhạc nền (tùy chọn) | Bài nhạc tự chọn, nút bật/tắt, chỉ chạy khi người dùng bấm | ⬜ |
| 13 | Album ảnh (tùy chọn) | Ảnh kỷ niệm của bạn trên thiệp | ⬜ |
| 14 | Route quản trị `/quan-ly` | Trang riêng của bạn: xem ai đã xác nhận tham dự / không / chưa phản hồi, kèm lời chúc của từng người | ✅ |
| 15 | Bảo vệ trang quản trị | Yêu cầu nhập mã PIN trước khi hiển thị dữ liệu | ✅ |
| 16 | Theo dõi lượt mở link (tùy chọn) | Ghi nhận ai đã mở thiệp (kể cả khi chưa phản hồi) | ⬜ |

---

## 4. Lựa chọn công nghệ

### Phương án A — React + Vite (KHUYẾN NGHỊ)
| Thành phần | Lựa chọn |
|---|---|
| Framework | React 19 + Vite |
| Điều hướng | React Router (route `/thiep-moi/:slug` cho khách + `/quan-ly` cho bạn) |
| Style | Tailwind CSS (hoặc CSS thuần nếu bạn muốn đơn giản) |
| Hiệu ứng | CSS animation + `canvas-confetti` (+ Framer Motion nếu muốn mượt hơn) |
| Dữ liệu khách | File `guests.json` ngay trong code — thêm khách = thêm 1 dòng JSON |
| Lưu RSVP | **Google Sheets qua Apps Script** (miễn phí, xem phản hồi dạng bảng Excel rất tiện) |
| Deploy | Vercel / Netlify (miễn phí) |

- ✅ Nhanh, nhẹ, dễ học, đủ mạnh cho mọi hiệu ứng cần thiết.
- ✅ Không cần server riêng — chỉ là web tĩnh + 1 endpoint Apps Script.
- ⚠️ Nếu bạn chưa quen React: có thể dùng biến thể **HTML/CSS/JS thuần** (vẫn cùng thiết kế, chỉ khác cách code).

### Phương án B — Next.js full-stack
- API route lưu RSVP vào SQLite/Supabase + trang quản trị xem phản hồi.
- ✅ Mạnh nhất, có dashboard thống kê.
- ❌ Phức tạp hơn đáng kể so với nhu cầu (danh sách khách ~vài chục người). Chỉ nên chọn nếu bạn muốn học Next.js hoặc cần bảng quản trị đẹp.

### Cách lưu RSVP (chọn 1)
1. **Google Sheets qua Apps Script** — phản hồi hiện ra từng dòng trong Google Sheet (Tên, Lựa chọn, Số người, Lời chúc, Thời gian gửi). Apps Script có 2 hàm: `ghiPhanHoi` (form RSVP gọi để **ghi**) và `docDanhSach` (trang `/quan-ly` gọi để **đọc** toàn bộ phản hồi dạng JSON). Miễn phí, xem được cả trên điện thoại. *(khuyến nghị — hỗ trợ đầy đủ route quản trị)*
2. **Backend tự viết** (Node/Express hoặc Supabase) — linh hoạt nhất, trang quản trị đọc thẳng database. Cần thêm 1 dịch vụ chạy server.
3. ~~**Formspree**~~ — chỉ gửi phản hồi vào email, **không đọc lại được** để hiển thị trên trang quản trị → đã loại khỏi phương án.

**Bảo vệ trang quản trị:** `/quan-ly` yêu cầu nhập mã PIN do bạn đặt. Hàm `docDanhSach` của Apps Script chỉ trả dữ liệu khi kèm đúng mã khóa (lưu trong Google Sheet). Mức bảo vệ này đủ cho quy mô thiệp mời cá nhân (không chứa dữ liệu nhạy cảm); nếu cần bảo mật nghiêm ngặt hơn thì chọn backend tự viết.

---

## 5. Thiết kế trải nghiệm & giao diện

### Luồng trải nghiệm khi khách mở link
```
Mở link → [1] Sân khấu tối, dòng chữ "Kính mời: <Tên khách>" hiện dưới ánh đèn rọi
        → [2] Bấm vào → màn nhung 2 bên từ từ kéo ra, ánh đèn sân khấu bừng sáng
        → [3] Thiệp chính xuất hiện giữa sân khấu (cuộn dọc):
            a. Tiêu đề "LỄ TỐT NGHIỆP" + dòng "Kính gửi: <Tên khách>"
            b. Lời mời chân thành (viết sẵn; có thể khác nhau theo nhóm khách)
            c. Đồng hồ đếm ngược tới giờ lễ
            d. Thời gian — Địa điểm (nút "Xem bản đồ" mở Google Maps)
            e. Liên hệ: nút gọi điện, nhắn Zalo
            f. Form Xác nhận tham dự:
               - "Tôi sẽ tham dự 🎉" → hiện thêm ô "Số người đi cùng"
               - "Tiếc quá, không đến được 😢" → lời động viên nhẹ nhàng
               - Ô "Lời chúc gửi đến <tên bạn>"
               - Nút "Gửi phản hồi"
            g. Gửi xong → mưa confetti + màn hình cảm ơn
            h. Footer: tên bạn + link lưu thiệp
```

### Trang quản trị `/quan-ly` (chỉ dành cho bạn)
- **Màn hình khóa:** nhập mã PIN → sai thì không hiện gì; đúng mới tải dữ liệu về.
- **Thẻ thống kê trên cùng:** Tổng khách mời · ✅ Sẽ tham dự · ❌ Không tham dự · ⏳ Chưa phản hồi · Tổng số người đi cùng.
- **Danh sách khách:** mỗi dòng gồm tên khách, nhóm (gia đình/bạn bè...), huy hiệu trạng thái màu, số người đi cùng, lời chúc (nếu có), thời gian gửi phản hồi.
- **Lọc & tìm kiếm:** tìm theo tên, lọc theo trạng thái hoặc nhóm, nút "Làm mới" tải dữ liệu mới nhất.
- Giao diện gọn gàng, đọc tốt cả trên điện thoại để bạn check bất cứ lúc nào.
- Ai chưa phản hồi sẽ hiện rõ ở trạng thái "Chưa phản hồi" (đối chiếu với danh sách khách mời đầy đủ).

### Phong cách thiết kế (đề xuất, bạn chọn 1 trong mục 9)
- **A. Trang trọng:** nền xanh navy đậm, chữ vàng gold, font serif — sang và đúng chất "lễ tốt nghiệp".
- **B. Tối giản thanh lịch:** nền kem/trắng, chữ xanh rêu, họa tiết mũ tốt nghiệp mảnh.
- **C. Theo màu trường của bạn** (cho tôi mã màu hoặc tên trường).

### Kỹ thuật thiết kế
- Font chữ hỗ trợ tiếng Việt tốt: **Be Vietnam Pro** (nội dung) + **Cormorant Garamond / Playfair Display** (tiêu đề — sẽ kiểm tra subset tiếng Việt trước khi dùng).
- Thiết kế dọc theo tỉ lệ điện thoại (375px), nút bấm cao ≥ 44px, chữ ≥ 16px.
- Hiệu ứng: màn nhung sân khấu (2 tấm màn CSS 3D kéo ngang + ánh đèn spotlight rọi giữa), fade-in từng khối khi cuộn, confetti, nhạc nền tùy chọn.
- Thời gian hiển thị theo giờ Việt Nam (GMT+7), kèm "thứ" trong tuần để khách không nhầm ngày.

---

## 6. Mô hình dữ liệu

File `src/data/guests.json`:

```jsonc
{
  "event": {
    "title": "Lễ Tốt Nghiệp — <Tên bạn>",
    "date": "2026-11-20",
    "time": "09:00",
    "venue": "Hội trường A, Trường Đại học ...",
    "address": "Số ..., Quận ..., TP. ...",
    "mapsUrl": "https://maps.app.goo.gl/...",
    "contact": {
      "phone": "09xx...",
      "zalo": "09xx...",
      "email": "...",
      "facebook": "..."
    },
    "dressCode": "(tùy chọn) Trang phục lịch sự"
  },
  "guests": [
    {
      "slug": "nguyen-van-a",       // → link: /thiep-moi/nguyen-van-a
      "name": "Nguyễn Văn A",        // hiển thị trên thiệp
      "group": "Gia đình",           // để phân loại, có thể dùng cho lời mời riêng
      "note": "Cảm ơn chú đã đồng hành cùng con"  // (tùy chọn) lời nhắn riêng
    }
  ]
}
```

Thêm khách mời = thêm 1 object vào mảng `guests`. Có thể viết 1 script nhỏ tự sinh link cho toàn bộ danh sách để gửi qua Zalo/Messenger.

Cấu trúc 1 dòng phản hồi lưu trong Google Sheet (mỗi lần khách gửi = 1 dòng):

| Cột | Ý nghĩa |
|---|---|
| `slug` | Mã khách — khớp với `guests.json` để đối chiếu |
| `name` | Tên khách |
| `rsvp` | `yes` (tham dự) / `no` (không tham dự) |
| `guestsCount` | Số người đi cùng (chỉ khi `rsvp = yes`) |
| `message` | Lời chúc của khách |
| `submittedAt` | Thời gian gửi phản hồi |

Trang quản trị ghép bảng phản hồi này với `guests.json` để biết ai đã phản hồi, ai **chưa phản hồi**.

---

## 7. Cấu trúc thư mục dự kiến (Phương án A)

```
thiep/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json                  # cấu hình Vercel (SPA rewrite)
├── apps-script/
│   └── Code.gs                  # mã Apps Script — dán vào Google Sheets (ghi + đọc RSVP)
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx
│   ├── App.jsx                  # Router: /, /thiep-moi/:slug, /quan-ly, * (404)
│   ├── config.js                # URL Apps Script, mã PIN, khóa đọc
│   ├── index.css                # toàn bộ style (palette kem – xanh rêu)
│   ├── data/
│   │   └── guests.json          # thông tin lễ + danh sách khách
│   ├── components/
│   │   ├── StageCurtain.jsx     # màn nhung sân khấu + animation mở
│   │   ├── Countdown.jsx        # đếm ngược
│   │   ├── EventInfo.jsx        # thời gian + địa điểm + bản đồ
│   │   ├── ContactInfo.jsx      # gọi điện / Zalo / email
│   │   ├── RsvpForm.jsx         # xác nhận + lời chúc + gửi lên Google Sheets + confetti
│   │   ├── Icon.jsx             # bộ icon SVG
│   │   └── Reveal.jsx           # hiệu ứng fade-in khi cuộn
│   └── pages/
│       ├── Landing.jsx          # trang chủ /
│       ├── InvitePage.jsx       # trang thiệp /thiep-moi/:slug
│       ├── AdminPage.jsx        # trang /quan-ly (PIN + thống kê + danh sách)
│       └── NotFound.jsx         # trang 404
└── README.md                    # hướng dẫn chạy, cấu hình, deploy
```

---

## 8. Kế hoạch triển khai (theo giai đoạn)

| Giai đoạn | Nội dung | Sản phẩm bàn giao |
|---|---|---|
| **G1. Khởi tạo** | Tạo dự án Vite + React, cài router, dựng cấu trúc thư mục, tạo `guests.json` mẫu với 2–3 khách ảo | Chạy được ở local, vào `/thiep-moi/...` ra đúng tên |
| **G2. Thiệp chính** | Màn hình màn nhung sân khấu + animation mở màn + toàn bộ nội dung thiệp (tên khách, thời gian, địa điểm, bản đồ, liên hệ, đếm ngược) | Thiệp hoàn chỉnh về nội dung |
| **G3. RSVP + Trang quản trị** | Form xác nhận (tham dự / không + số người + lời chúc), kết nối Google Sheets (Apps Script: hàm ghi + hàm đọc), xử lý trạng thái đang gửi / lỗi / thành công, confetti; trang `/quan-ly` với khóa PIN, thẻ thống kê và danh sách phản hồi có lọc/tìm | Phản hồi hiện đúng dòng trong Google Sheet; trang quản trị hiển thị đầy đủ và cập nhật khi bấm "Làm mới" |
| **G4. Hoàn thiện** | Responsive đa thiết bị, hiệu ứng cuộn, trang 404, nhạc nền & album ảnh (nếu chọn), kiểm thử trên điện thoại thật | Sẵn sàng deploy |
| **G5. Deploy** | Đẩy lên Vercel/Netlify, kiểm tra link thật, sinh link cho từng khách từ `guests.json`, viết README | Gửi link cho khách được |

---

## 9. Thông tin cần bạn cung cấp (trả lời để tôi bắt đầu)

**✅ Đã chốt (2026-09-13):** Công nghệ **React + Vite** · Phong cách **B — Tối giản (kem–xanh rêu)** · Lưu RSVP **Google Sheets** · Deploy **Vercel**.

Các câu còn lại: nếu chưa cung cấp, code dùng **dữ liệu mẫu** được đánh dấu rõ — bạn điền sau vào `src/data/guests.json` và `src/config.js`.

1. ⏳ **Thông tin buổi lễ:** ngày – giờ – tên địa điểm – địa chỉ – link Google Maps (đang để mẫu: 21/11/2026, 09:00).
2. ⏳ **Thông tin liên hệ của bạn:** SĐT, Zalo, email (đang để mẫu: 09xxxxxxxx).
3. ⏳ **Danh sách khách mời:** tên từng người + nhóm (đang có 3 khách mẫu để test).
4. ✅ ~~Phong cách~~ — đã chốt B (tối giản kem–xanh rêu).
5. ⏳ **Ảnh của bạn** để chèn lên thiệp (nếu muốn) — ảnh chân dung hoặc ảnh tốt nghiệp.
6. ✅ ~~Công nghệ~~ — đã chốt React + Vite.
7. ✅ ~~Lưu RSVP~~ — đã chốt Google Sheets (bạn cần tạo 1 Google Sheet, hướng dẫn trong README.md).
8. ✅ ~~Deploy~~ — đã chốt Vercel.
9. ⏳ **Nhạc nền & album ảnh:** có cần không?
10. ⏳ **Mã PIN trang `/quan-ly`:** đang để mặc định `1234` — bạn đổi trong `src/config.js` trước khi gửi thiệp.

---

## 10. Tiêu chí hoàn thành (Definition of Done)

- [ ] Mở link của 2 khách khác nhau → hiển thị đúng tên từng người.
- [ ] Gửi phản hồi thành công → Google Sheet có đủ: tên, lựa chọn, số người, lời chúc, thời gian gửi.
- [ ] Gửi phản hồi lần 2 (sửa lựa chọn) → không tạo dòng trùng lặp.
- [ ] Hiển thị tốt trên iPhone & Android phổ biến (kiểm tra bằng điện thoại thật).
- [ ] Tải trang < 3 giây trên mạng 4G.
- [ ] Link sai → trang 404 thân thiện, không lỗi trắng màn hình.
- [ ] Trang `/quan-ly`: nhập sai PIN → không thấy dữ liệu; nhập đúng → hiện đầy đủ danh sách + lời chúc.
- [ ] Trang quản trị phản ánh đúng: khách gửi phản hồi xong, bấm "Làm mới" là thấy ngay; ai chưa phản hồi hiện rõ "Chưa phản hồi".
- [ ] Deploy xong, có danh sách link từng khách sẵn sàng gửi.

---

## Nguồn tham khảo chính

- [Greenvelope — Graduation Invitations](https://www.greenvelope.com/es/invitaciones-a-fiestas-de-graduaci%C3%B3n)
- [InviteDrop (Product Hunt)](https://www.producthunt.com/products/invitedrop?launch=invitedrop)
- [Invyt — Premium Digital Invitations](https://invyt.io/premium-digital-invitations)
- [Fotify — Digital Graduation Invitations 2026](https://fotify.app/blog/digital-graduation-invitations-2026/)
- [Destiny Invitations (Product Hunt)](https://www.producthunt.com/products/destiny-invitations)
- [Paperless Post — Online Invitations with RSVP](https://www.paperlesspost.com/cards/section/invitations)
- [Greenvelope — Compare Digital Invitation Platforms](https://www.greenvelope.com/compare)
- [Zenlove.me — thiệp online Việt Nam](https://www.techrum.vn/threads/chia-s%E1%BA%BB-zenlove-me-tr%E1%BA%A3i-nghi%E1%BB%87m-t%E1%BA%A1o-thi%E1%BB%87p-c%C6%B0%E1%BB%9Bi-online-phong-c%C3%A1ch-t%E1%BB%91i-gi%E1%BA%A3n-tinh-t%E1%BA%BF-v%C3%A0-ho%C3%A0n-to%C3%A0n-mi%E1%BB%85n-ph%C3%AD.883711/)
- [Trao Thiệp — số hóa văn hóa gửi thiệp Việt (Báo Lâm Đồng)](https://baolamdong.vn/trao-thiep-va-hanh-trinh-so-hoa-van-hoa-gui-loi-moi-cua-nguoi-viet-456895.html)
- [Lemon8 — Cách tự làm thiệp mời tốt nghiệp](https://www.lemon8-app.com/@vitaminnci_/7555837586921570834?region=vn)
