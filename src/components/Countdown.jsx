import { useEffect, useState } from 'react'

function diff(target) {
  const d = target - new Date()
  if (Number.isNaN(d) || d <= 0) return null
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor(d / 3600000) % 24,
    mins: Math.floor(d / 60000) % 60,
    secs: Math.floor(d / 1000) % 60,
  }
}

export default function Countdown({ target }) {
  const [left, setLeft] = useState(() => diff(target))

  useEffect(() => {
    const id = setInterval(() => setLeft(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  if (!left) {
    return <p className="countdown-done">Hẹn gặp bạn tại buổi lễ! 🎓</p>
  }

  return (
    <div className="countdown">
      <div className="countdown-box">
        <b>{left.days}</b>
        <span>ngày</span>
      </div>
      <div className="countdown-box">
        <b>{left.hours}</b>
        <span>giờ</span>
      </div>
      <div className="countdown-box">
        <b>{left.mins}</b>
        <span>phút</span>
      </div>
      <div className="countdown-box">
        <b>{left.secs}</b>
        <span>giây</span>
      </div>
    </div>
  )
}
