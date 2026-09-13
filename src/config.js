// ⚙️ CẤU HÌNH CHUNG — xem README.md để biết cách điền từng mục

export const CONFIG = {
  // URL Web App của Google Apps Script (README.md → mục "Kết nối Google Sheets")
  // Dán URL vào đây, ví dụ: 'https://script.google.com/macros/s/.../exec'
  appsScriptUrl:
    "https://script.google.com/macros/s/AKfycbwXJqWEpnMWpouiQ-lXyC7weY46ONZ4rVHK4WgOBMv2zh1JGm7dRKOuuP2jkuXWePsE/exec",

  // Mã PIN để mở trang /quan-ly — HÃY ĐỔI trước khi gửi thiệp cho khách
  adminPin: "1234",

  // Khóa đọc dữ liệu — phải khớp với READ_KEY trong apps-script/Code.gs
  readKey: "doi-thanh-chuoi-bi-mat",
};
