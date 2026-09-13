// Hạt lấp lánh bay nhẹ trên nền trang thiệp
const DOTS = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 67 + 13) % 96,
  top: 8 + ((i * 37) % 80),
  size: 3 + (i % 3) * 2,
  delay: (i * 0.9) % 6,
  dur: 7 + (i % 5) * 2,
}))

export default function BackgroundDecor() {
  return (
    <div className="bg-decor" aria-hidden="true">
      {DOTS.map((d, i) => (
        <span
          key={i}
          className="bg-spark"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.dur}s`,
          }}
        />
      ))}
    </div>
  )
}
