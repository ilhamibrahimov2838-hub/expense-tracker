import { useState } from 'react'
import Donut from './Donut'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function Year({ items }) {
  const [year, setYear] = useState(new Date().getFullYear()); const [sel, setSel] = useState(null)
  const inYear = items.filter((i) => i.date.slice(0, 4) === String(year))
  const yearCats = {}
  inYear.forEach((i) => { yearCats[i.category] = (yearCats[i.category] || 0) + Number(i.amount) })
  const perMonth = MONTHS.map((_, idx) => {
    const key = year + '-' + String(idx + 1).padStart(2, '0')
    const rows = items.filter((i) => i.date.slice(0, 7) === key)
    const cats = {}
    rows.forEach((i) => { cats[i.category] = (cats[i.category] || 0) + Number(i.amount) })
    return { total: rows.reduce((s, i) => s + Number(i.amount), 0), cats }
  })
  const max = Math.max(...perMonth.map((m) => m.total), 1)

  return (
    <div className="ins">
      <h1>Year</h1>
      <div className="yrpick">
        <button onClick={() => setYear(year - 1)}>‹</button>
        <b>{year}</b>
        <button onClick={() => setYear(year + 1)}>›</button>
      </div>
      <Donut data={yearCats} size={170} />
      <h2>Spent per month</h2>
      <div className="mbars">
        {perMonth.map((m, idx) => (
          <div key={idx} className="mb" onClick={() => setSel(sel === idx ? null : idx)} title={'$' + m.total.toFixed(2)}>
            {sel === idx && <em className="tip">${m.total.toLocaleString('en-US', { maximumFractionDigits: 2 })}</em>}<div className="mfill" style={{ height: Math.round((m.total / max) * 90) + 'px', background: MCOLORS[idx], boxShadow: '0 0 6px ' + MCOLORS[idx] + '55' }} />
            <span>{MONTHS[idx]}</span>
          </div>
        ))}
      </div>
      <h2>Each month</h2>
      <div className="minis">
        {perMonth.map((m, idx) => (
          <div key={idx} className="mini"><Donut data={m.cats} size={64} color={MCOLORS[idx]} /><span>{MONTHS[idx]}</span></div>
        ))}
      </div>
    </div>
  )
}

const MCOLORS = ['#5b7fc7', '#5a8fb8', '#4f9aa8', '#4fa092', '#5fa07a', '#7fa36a', '#9aa35f', '#b09a5f', '#b0805f', '#b06f6f', '#a36f93', '#8a74b0']
