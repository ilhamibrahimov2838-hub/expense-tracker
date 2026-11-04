import { cur } from './currency'
import { t } from './i18n'

export default function Hero({ items }) {
  const now = new Date()
  const key = now.toLocaleDateString('en-CA').slice(0, 7)
  const total = items.filter((i) => i.date.slice(0, 7) === key).reduce((s, i) => s + Number(i.amount), 0)
  const fmt = (n) => cur() + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="hero">
      <div>
        <small>{t('Spent')}</small>
        <b>{fmt(total)}</b>
        <small>{fmt(total / now.getDate())} · {t('Per day')}</small>
      </div>
      <svg width="110" height="100" viewBox="0 0 110 100" aria-hidden="true">
        <circle cx="52" cy="14" r="11" fill="#ffc83d" stroke="#e8a317" strokeWidth="3" />
        <ellipse cx="52" cy="60" rx="38" ry="28" fill="#ff8fa3" />
        <path d="M28 40 L34 22 L46 36Z" fill="#ff6f8a" />
        <ellipse cx="88" cy="62" rx="12" ry="10" fill="#ff6f8a" />
        <circle cx="85" cy="60" r="2" fill="#7a2a3a" />
        <circle cx="91" cy="60" r="2" fill="#7a2a3a" />
        <circle cx="68" cy="50" r="3" fill="#3a2f2a" />
        <rect x="26" y="80" width="10" height="14" rx="4" fill="#ff6f8a" />
        <rect x="62" y="80" width="10" height="14" rx="4" fill="#ff6f8a" />
        <rect x="44" y="33" width="16" height="4" rx="2" fill="#c9455f" />
      </svg>
    </div>
  )
}
