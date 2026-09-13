import { useState } from 'react'
import confetti from 'canvas-confetti'
import { CONFIG } from '../config.js'
import Reveal from './Reveal.jsx'
import Icon from './Icon.jsx'

function fireConfetti() {
  const colors = ['#8c1622', '#b08d57', '#d9c49a', '#5f0d18']
  confetti({ particleCount: 130, spread: 85, origin: { y: 0.7 }, colors })
  setTimeout(() => confetti({ particleCount: 70, spread: 110, origin: { y: 0.55 }, colors }), 450)
}

export default function RsvpForm({ guest, ownerName }) {
  const [choice, setChoice] = useState(null) // null | 'yes' | 'no'
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [errorMsg, setErrorMsg] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!choice || status === 'sending') return
    setStatus('sending')
    setErrorMsg('')

    const payload = {
      slug: guest.slug,
      name: guest.name,
      rsvp: choice,
      message,
    }

    try {
      if (!CONFIG.appsScriptUrl) {
        throw new Error('Chưa cấu hình Google Sheets — xem README.md, mục "Kết nối Google Sheets".')
      }
      // Gửi dạng text/plain để tránh preflight CORS với Apps Script
      const res = await fetch(CONFIG.appsScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => null)
      if (!data || data.ok !== true) {
        throw new Error(data?.error || `Lỗi kết nối (HTTP ${res.status})`)
      }
      setStatus('done')
      fireConfetti()
    } catch (err) {
      console.error('Gửi phản hồi thất bại:', err)
      setErrorMsg(err.message || String(err))
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <section className="section" id="rsvp">
        <Reveal>
          <div className="rsvp-success">
            <div className="success-spark">
              <Icon name="sparkle" size={28} />
            </div>
            <h3>{choice === 'yes' ? 'Hẹn gặp lại bạn nhé! 🎉' : 'Cảm ơn bạn đã hồi đáp 💚'}</h3>
            <p>
              {choice === 'yes'
                ? 'Phản hồi của bạn đã được gửi thành công. Mình rất mong chờ ngày trọng đại có bạn bên cạnh!'
                : 'Dù không thể tham dự, lời chúc của bạn vẫn là món quà quý giá nhất đối với mình.'}
            </p>
            <button
              className="btn btn-outline"
              style={{ marginTop: 16 }}
              onClick={() => {
                setStatus('idle')
                setChoice(null)
                setMessage('')
              }}
            >
              Gửi lại phản hồi khác
            </button>
          </div>
        </Reveal>
      </section>
    )
  }

  return (
    <section className="section" id="rsvp">
      <Reveal>
        <div className="section-head">
          <h2 className="section-title">Xác nhận tham dự</h2>
          <p className="info-sub">Bạn có thể tham dự buổi lễ không?</p>
        </div>

        <form onSubmit={submit}>
          <div className="rsvp-choice">
            <button
              type="button"
              className={`choice-btn ${choice === 'yes' ? 'selected-yes' : ''}`}
              onClick={() => setChoice('yes')}
            >
              <span className="choice-emoji">🎉</span>
              Tôi sẽ tham dự
            </button>
            <button
              type="button"
              className={`choice-btn ${choice === 'no' ? 'selected-no' : ''}`}
              onClick={() => setChoice('no')}
            >
              <span className="choice-emoji">😢</span>
              Tiếc quá, không đến được
            </button>
          </div>

          <div className="rsvp-extra">
            <div>
              <label className="field-label" htmlFor="loi-chuc">
                Nếu có lời chúc nào gửi đến {ownerName}, bạn hãy để lại ở đây nhé:
              </label>
              <textarea
                id="loi-chuc"
                className="field"
                placeholder="Chúc mừng bạn tốt nghiệp! Chúc bạn..."
                value={message}
                maxLength={1000}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          {status === 'error' && (
            <div className="rsvp-error">
              ⚠️{' '}
              {errorMsg ||
                `Gửi phản hồi thất bại. Vui lòng thử lại, hoặc liên hệ trực tiếp với ${ownerName}.`}
            </div>
          )}

          <button type="submit" className="btn btn-primary rsvp-submit" disabled={!choice || status === 'sending'}>
            {status === 'sending' ? 'Đang gửi...' : 'Gửi phản hồi'}
          </button>
        </form>
      </Reveal>
    </section>
  )
}
