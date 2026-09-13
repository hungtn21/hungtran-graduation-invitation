import { useMemo, useState } from 'react'
import guestsData from '../data/guests.json'
import { CONFIG } from '../config.js'
import Icon from '../components/Icon.jsx'
import { formatDateVN } from '../components/EventInfo.jsx'

const FILTERS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'yes', label: 'Sẽ tham dự' },
  { key: 'no', label: 'Không tham dự' },
  { key: 'none', label: 'Chưa phản hồi' },
]

function loadResponses() {
  if (!CONFIG.appsScriptUrl) return Promise.resolve(null)
  return fetch(`${CONFIG.appsScriptUrl}?key=${encodeURIComponent(CONFIG.readKey)}`)
    .then((res) => res.json())
    .then((rows) => {
      if (!Array.isArray(rows)) throw new Error(rows?.error || 'Sai mã khóa hoặc lỗi dữ liệu')
      const bySlug = {}
      rows.forEach((r) => {
        bySlug[r.slug] = r // dòng ghi sau cùng thắng (khách gửi lại phản hồi)
      })
      return bySlug
    })
}

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('admin-unlocked') === '1')
  const [pin, setPin] = useState('')
  const [shake, setShake] = useState(false)
  const [rows, setRows] = useState(null) // null = chưa tải
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const unlock = (e) => {
    e.preventDefault()
    if (pin === CONFIG.adminPin) {
      sessionStorage.setItem('admin-unlocked', '1')
      setUnlocked(true)
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 450)
      setPin('')
    }
  }

  const refresh = () => {
    setLoading(true)
    setError('')
    loadResponses()
      .then(setRows)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  const stats = useMemo(() => {
    const base = { total: guestsData.guests.length, yes: 0, no: 0, none: 0, pax: 0 }
    guestsData.guests.forEach((g) => {
      const r = rows?.[g.slug]
      if (!r) base.none += 1
      else if (r.rsvp === 'yes') {
        base.yes += 1
        base.pax += Number(r.guestsCount) || 0
      } else base.no += 1
    })
    return base
  }, [rows])

  const visible = guestsData.guests.filter((g) => {
    const r = rows?.[g.slug]
    const status = !r ? 'none' : r.rsvp
    if (filter !== 'all' && status !== filter) return false
    if (query && !g.name.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

  if (!unlocked) {
    return (
      <div className="admin-pin">
        <Icon name="lock" size={34} />
        <h1>Khu vực quản lý</h1>
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>Nhập mã PIN để xem danh sách phản hồi</p>
        <form
          onSubmit={unlock}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
        >
          <input
            type="password"
            inputMode="numeric"
            className={`pin-input ${shake ? 'pin-shake' : ''}`}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="••••"
            autoFocus
          />
          <button type="submit" className="btn btn-primary">
            Mở khóa
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="admin">
      <h1 style={{ fontFamily: 'var(--display)', color: 'var(--crimson-deep)', fontSize: 30 }}>
        Quản lý phản hồi
      </h1>
      <p style={{ color: 'var(--muted)', fontSize: 14 }}>
        {guestsData.event.title} · {formatDateVN(guestsData.event.date)} · {guestsData.event.time}
      </p>

      <div className="stats">
        <div className="stat">
          <b>{stats.total}</b>
          <span>Khách mời</span>
        </div>
        <div className="stat stat-yes">
          <b>{stats.yes}</b>
          <span>Sẽ tham dự</span>
        </div>
        <div className="stat stat-no">
          <b>{stats.no}</b>
          <span>Không tham dự</span>
        </div>
        <div className="stat stat-none">
          <b>{stats.none}</b>
          <span>Chưa phản hồi</span>
        </div>
        <div className="stat stat-yes">
          <b>{stats.pax}</b>
          <span>Người đi cùng</span>
        </div>
      </div>

      {!CONFIG.appsScriptUrl && (
        <div className="admin-setup">
          ⚠️ Chưa cấu hình Google Sheets nên dữ liệu phản hồi chưa được tải. Xem README.md → mục "Kết nối
          Google Sheets", dán URL vào <code>src/config.js</code> rồi bấm "Làm mới".
        </div>
      )}
      {error && <div className="admin-setup">⚠️ {error}</div>}

      <div className="admin-toolbar">
        <input
          className="admin-search"
          placeholder="Tìm theo tên..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`filter-btn ${filter === f.key ? 'active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
        <button className="btn btn-outline" onClick={refresh} disabled={loading}>
          <Icon name="refresh" size={15} /> {loading ? 'Đang tải...' : 'Làm mới'}
        </button>
      </div>

      {visible.map((g) => {
        const r = rows?.[g.slug]
        const status = !r ? 'none' : r.rsvp
        return (
          <div className="guest-row" key={g.slug}>
            <div>
              <div className="g-name">{g.name}</div>
              <div className="g-group">{g.group || ''}</div>
              {r?.message && <div className="g-msg">“{r.message}”</div>}
            </div>
            <div className="g-right">
              {status === 'yes' && (
                <span className="badge badge-yes">
                  ✅ Sẽ tham dự{Number(r.guestsCount) ? ` (+${r.guestsCount})` : ''}
                </span>
              )}
              {status === 'no' && <span className="badge badge-no">❌ Không tham dự</span>}
              {status === 'none' && <span className="badge badge-none">⏳ Chưa phản hồi</span>}
              {r?.submittedAt && (
                <div className="g-time">{new Date(r.submittedAt).toLocaleString('vi-VN')}</div>
              )}
            </div>
          </div>
        )
      })}
      {visible.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--muted)' }}>Không có khách nào khớp bộ lọc.</p>
      )}
    </div>
  )
}
