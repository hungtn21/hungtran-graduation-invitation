import { useState } from 'react'
import Icon from './Icon.jsx'

// Màn nhung sân khấu: bấm vào → 2 tấm màn kéo ra 2 bên → lộ thiệp
export default function StageCurtain({ guestName, onOpen }) {
  const [stage, setStage] = useState('idle') // idle → opening → gone

  const open = () => {
    if (stage !== 'idle') return
    setStage('opening')
    setTimeout(() => {
      setStage('gone')
      onOpen()
    }, 1600)
  }

  return (
    <div className={`stage stage-${stage}`} onClick={open}>
      <div className="spotlight">
        <span className="dust d1" />
        <span className="dust d2" />
        <span className="dust d3" />
        <span className="dust d4" />
      </div>
      <div className="valance" />
      <div className="curtain curtain-left" />
      <div className="curtain curtain-right" />
      <div className="stage-floor" />
      <div className="stage-center">
        <span className="spark spark-1">
          <Icon name="sparkle" size={16} />
        </span>
        <span className="spark spark-2">
          <Icon name="sparkle" size={11} />
        </span>
        <span className="spark spark-3">
          <Icon name="sparkle" size={14} />
        </span>
        <div className="stage-cap">
          <Icon name="cap" size={40} />
        </div>
        <p className="stage-sub">Trân trọng kính mời</p>
        <h1 className="stage-name">{guestName}</h1>
        <p className="stage-hint">Mở khóa bí mật nào!</p>
      </div>
    </div>
  )
}
