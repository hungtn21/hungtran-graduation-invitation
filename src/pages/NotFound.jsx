import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="notfound">
      <p className="big">🎓</p>
      <h1>Thiệp không tồn tại</h1>
      <p>
        Liên kết có thể bị sai hoặc chưa được tạo. Bạn hãy hỏi lại người gửi thiệp để nhận liên kết
        chính xác nhé!
      </p>
      <Link className="btn btn-outline" to="/">
        Về trang chủ
      </Link>
    </div>
  )
}
