import { useState } from 'react'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'

const WEEKDAYS = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']

export function formatDateVN(isoDate) {
  const d = new Date(`${isoDate}T00:00:00`)
  if (Number.isNaN(d.getTime())) return isoDate
  return `${WEEKDAYS[d.getDay()]}, ngày ${d.getDate()} tháng ${d.getMonth() + 1} năm ${d.getFullYear()}`
}

export default function EventInfo({ event }) {
  const [mapOpen, setMapOpen] = useState(false)

  return (
    <section className="section" id="thong-tin">
      <Reveal>
        <div className="section-head">
          <h2 className="section-title">Thông tin buổi lễ</h2>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <Icon name="calendar" />
          </div>
          <div>
            <div className="info-label">Thời gian</div>
            <div className="info-value">{formatDateVN(event.date)}</div>
            <div className="info-sub">Bắt đầu lúc {event.time}</div>
          </div>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <Icon name="pin" />
          </div>
          <div>
            <div className="info-label">Địa điểm</div>
            <div className="info-value">{event.venue}</div>
            <div className="info-sub">{event.address}</div>
          </div>
        </div>

        {/* Sơ đồ trường — bấm vào để phóng to */}
        <div className="map-block">
          <div className="map-frame" onClick={() => setMapOpen(true)}>
            <img src="/so-do-hust.jpg" alt="Sơ đồ Đại học Bách khoa Hà Nội" />
            <span className="map-hint">🔍 Bấm để phóng to sơ đồ</span>
          </div>
          <p className="map-caption">Sơ đồ khuôn viên Đại học Bách khoa Hà Nội</p>
        </div>

        <div className="contact-row" style={{ marginTop: 16 }}>
          <a className="btn btn-outline" href={event.mapsUrl} target="_blank" rel="noreferrer">
            <Icon name="pin" size={16} /> Xem bản đồ
          </a>
          <button type="button" className="btn btn-outline" onClick={() => setMapOpen(true)}>
            🗺️ Xem sơ đồ trường
          </button>
        </div>

        {mapOpen && (
          <div className="lightbox" onClick={() => setMapOpen(false)}>
            <button type="button" className="lightbox-close" onClick={() => setMapOpen(false)}>
              ✕
            </button>
            <img
              src="/so-do-hust.jpg"
              alt="Sơ đồ Đại học Bách khoa Hà Nội"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </Reveal>
    </section>
  )
}
