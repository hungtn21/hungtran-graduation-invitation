// Họa tiết góc vàng ở 4 góc thiệp (kiểu thiệp in sang trọng)
export default function CardFrame() {
  return (
    <div className="card-frame" aria-hidden="true">
      <span className="cf cf-tl" />
      <span className="cf cf-tr" />
      <span className="cf cf-bl" />
      <span className="cf cf-br" />
    </div>
  )
}
