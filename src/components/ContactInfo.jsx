import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'

export default function ContactInfo({ contact, ownerName }) {
  const zaloHref = `https://zalo.me/${contact.zalo.replace(/\D/g, '')}`

  return (
    <section className="section" id="lien-he">
      <Reveal>
        <div className="section-head">
          <h2 className="section-title">Liên hệ</h2>
          <br />
          <p className="info-sub">
            Cần hỗ trợ hay có bất kỳ thắc mắc nào, đừng ngần ngại nhắn cho {ownerName} nhé!
          </p>
        </div>
        <div className="contact-row">
          <a className="btn btn-outline" href={`tel:${contact.phone}`}>
            <Icon name="phone" size={16} /> Gọi điện
          </a>
          <a className="btn btn-outline" href={zaloHref} target="_blank" rel="noreferrer">
            <Icon name="chat" size={16} /> Nhắn Zalo
          </a>
        </div>
      </Reveal>
    </section>
  )
}
