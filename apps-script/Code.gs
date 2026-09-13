/**
 * MÃ GOOGLE APPS SCRIPT CHO THIỆP MỜI LỄ TỐT NGHIỆP
 * Cách dùng: xem README.md — mục "Kết nối Google Sheets"
 */

var SHEET_ID = 'PASTE_GOOGLE_SHEET_ID';   // thay bằng ID trong link Google Sheet của bạn
var SHEET_NAME = 'PhanHoi';               // tên tab lưu phản hồi
var READ_KEY = 'doi-thanh-chuoi-bi-mat';  // phải khớp với readKey trong src/config.js

function getSheet_() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    // Chưa có tab PhanHoi → tự tạo kèm dòng tiêu đề
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Slug', 'Tên', 'RSVP', 'Số người đi cùng', 'Lời chúc', 'Thời gian gửi']);
  }
  return sheet;
}

/** Form RSVP trên thiệp gọi hàm này để GHI phản hồi */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet_();
    var row = [
      data.slug || '',
      data.name || '',
      data.rsvp || '',
      data.guestsCount || '',
      data.message || '',
      new Date().toISOString()
    ];

    // Nếu khách đã phản hồi rồi thì ghi đè dòng cũ (không tạo dòng trùng)
    var values = sheet.getDataRange().getValues();
    var rowIndex = -1;
    for (var i = 1; i < values.length; i++) {
      if (String(values[i][0]) === String(data.slug)) {
        rowIndex = i + 1;
        break;
      }
    }

    if (rowIndex > 0) {
      sheet.getRange(rowIndex, 1, 1, row.length).setValues([row]);
    } else {
      sheet.appendRow(row);
    }

    return jsonOut_({ ok: true });
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err) });
  }
}

/** Trang /quan-ly gọi hàm này để ĐỌC toàn bộ phản hồi */
function doGet(e) {
  if (e.parameter.key !== READ_KEY) {
    return jsonOut_({ error: 'Sai ma khoa' });
  }

  var sheet = getSheet_();
  var values = sheet.getDataRange().getValues();
  var rows = [];
  for (var i = 1; i < values.length; i++) {
    var r = values[i];
    if (String(r[0]).toLowerCase() === 'slug') continue; // bỏ qua dòng tiêu đề
    if (!r[0]) continue;                                  // bỏ qua dòng trống
    rows.push({
      slug: r[0],
      name: r[1],
      rsvp: r[2],
      guestsCount: r[3],
      message: r[4],
      submittedAt: r[5] || ''
    });
  }

  return jsonOut_(rows);
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
