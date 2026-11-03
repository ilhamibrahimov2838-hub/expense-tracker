const COLORS = {
  Food: '#e4572e', Transport: '#2e86de', Housing: '#8e5bd4', Bills: '#f2a900',
  Health: '#17a589', Fun: '#d6409f', Shopping: '#5d7b8a', Other: '#9a8c7a',
}

export default function Charts({ items }) {
  const month = new Date().toLocaleDateString('en-CA').slice(0, 7)
  const byCat = {}
  items.forEach((i) => {
    if (i.date.slice(0, 7) === month) byCat[i.category] = (byCat[i.category] || 0) + Number(i.amount)
  })
  const cats = Object.keys(byCat).sort((a, b) => byCat[b] - byCat[a])
  const monthTotal = cats.reduce((s, c) => s + byCat[c], 0)

  const months = []
  const now = new Date()
  for (let k = 5; k >= 0; k--) {
    const d = new Date(now.getFullYear(), now.getMonth() - k, 1)
    const key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0')
    const total = items.filter((i) => i.date.slice(0, 7) === key).reduce((s, i) => s + Number(i.amount), 0)
    months.push({ label: d.toLocaleDateString('en', { month: 'short' }), total })
  }
  const max = Math.max(...months.map((m) => m.total), 1)
  const R = 40
  const C = 2 * Math.PI * R
  let offset = 0
  if (items.length === 0) return null

  return (
    <div className="charts">
      <h2>This month</h2>
      <svg viewBox="0 0 100 100" className="donut">
        <circle cx="50" cy="50" r={R} fill="none" stroke="#222" strokeWidth="14" />
        {cats.map((c) => {
          const len = (byCat[c] / monthTotal) * C
          const ring = (
            <circle key={c} cx="50" cy="50" r={R} fill="none" stroke={COLORS[c] || '#888'} strokeWidth="14" strokeDasharray={len + ' ' + (C - len)} strokeDashoffset={-offset} transform="rotate(-90 50 50)" />
          )
          offset += len
          return ring
        })}
        <text x="50" y="54" textAnchor="middle" fill="#ededed" fontSize="11" fontWeight="700">${monthTotal.toFixed(0)}</text>
      </svg>
      <ul className="legend">
        {cats.map((c) => (
          <li key={c}>
            <span className="dot" style={{ background: COLORS[c] || '#888' }} />
            <span className="nm">{c}</span>
            <b>${byCat[c].toFixed(2)}</b>
          </li>
        ))}
      </ul>
      <h2>Last 6 months</h2>
      <div className="bars">
        {months.map((m) => (
          <div key={m.label} className="bar" title={'$' + m.total.toFixed(2)}>
            <div className="fill" style={{ height: Math.round((m.total / max) * 100) + 'px' }} />
            <span>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
