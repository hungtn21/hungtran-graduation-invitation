import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import guestsData from '../data/guests.json'
import StageCurtain from '../components/StageCurtain.jsx'
import Reveal from '../components/Reveal.jsx'
import Countdown from '../components/Countdown.jsx'
import EventInfo, { formatDateVN } from '../components/EventInfo.jsx'
import ContactInfo from '../components/ContactInfo.jsx'
import RsvpForm from '../components/RsvpForm.jsx'
import Icon from '../components/Icon.jsx'
import BackgroundDecor from '../components/BackgroundDecor.jsx'
import CardFrame from '../components/CardFrame.jsx'
import NotFound from './NotFound.jsx'

export default function InvitePage() {
  const { slug } = useParams()
  const guest = guestsData.guests.find((g) => g.slug === slug)
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    document.title = guest ? `Thiệp mời Lễ Tốt Nghiệp — ${guest.name}` : 'Thiệp không tồn tại'
  }, [guest])

  if (!guest) return <NotFound />
  const { event } = guestsData
  const target = new Date(`${event.date}T${event.time}:00`)

  return (
    <>
      <StageCurtain guestName={guest.name} onOpen={() => setOpened(true)} />
      <BackgroundDecor />
      <main className={`card ${opened ? 'card-visible' : 'card-hidden'}`}>
        <CardFrame />
        <Reveal>
          <header className="hero">
            <div className="ornament">
              <Icon name="laurel" size={34} />
              <Icon name="cap" size={34} />
              <Icon name="laurel" size={34} />
            </div>
            <p className="hero-kicker">Trân trọng kính mời</p>
            <h1 className="hero-title">Lễ Tốt Nghiệp</h1>
            <p className="hero-owner">của {event.ownerName}</p>
            <div className="guest-line">
              <p className="guest-kicker">Thân mời</p>
              <div className="guest-frame">
                <h2 className="guest-name">{guest.name}</h2>
              </div>
            </div>
          </header>
        </Reveal>

        <Reveal>
          <p className="greeting">
            Một chặng đường dài sắp khép lại, và <b>{event.ownerName}</b> muốn chia sẻ niềm vui ngày tốt
            nghiệp với những người thân thương nhất. Sự hiện diện của bạn chính là món quà ý nghĩa nhất
            trong ngày trọng đại này!
          </p>
        </Reveal>

        <EventInfo event={event} />
        <RsvpForm guest={guest} ownerName={event.ownerName} />
        <section className="section">
          <Reveal>
            <div className="section-head">
              <h2 className="section-title">Đếm ngược</h2>
            </div>
            <Countdown target={target} />
          </Reveal>
        </section>

        <ContactInfo contact={event.contact} ownerName={event.ownerName} />
        

        <footer className="footer">
          <Reveal>
            <div className="footer-swash" aria-hidden="true" />
            <p className="sign">{event.ownerName} trân trọng kính mời</p>
            <p className="keep">Hãy giữ liên kết này để xem lại thiệp bất cứ lúc nào.</p>
          </Reveal>
        </footer>
      </main>
    </>
  )
}
