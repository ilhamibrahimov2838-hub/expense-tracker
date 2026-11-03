import { useState } from 'react'

const COLORS = {
  Food: '#e4572e', Transport: '#2e86de', Housing: '#8e5bd4', Bills: '#f2a900',
  Health: '#17a589', Fun: '#d6409f', Shopping: '#5d7b8a', Other: '#9a8c7a',
}
const money = (n) => '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export default function Insights({ items }) {
  const [month, setMonth] = useState(new Date().toLocaleDateString('en-CA').slice(0, 7))
  const inMonth = items.filter((i) => i.date.slice(0, 7) === month)
  const total = inMonth.reduce((s, i) => s + Number(i.amount), 0)
  const [y, m] = month.split('-').map(Number)
  const daysInMonth = new Date(y, m, 0).getDate()
  const nowKey = new Date().toLocaleDateString('en-CA').slice(0, 7)
  const daysCounted = month === nowKey ? new Date().getDate() : daysInMonth
  const perDay = total / daysCounted
  const prev = new Date(y, m - 2, 1)
  const prevKey = prev.getFullYear() + '-' + String(prev.getMonth() + 1).padStart(2, '0')
  const prevTotal = items.filter((i) => i.date.slice(0, 7) === prevKey).reduce((s, i) => s + Number(i.amount), 0)
  const change = prevTotal > 0 ? Math.round(((total - prevTotal) / prevTotal) * 100) : null
  const byCat = {}
  inMonth.forEach((i) => { byCat[i.category] = (byCat[i.category] || 0) + Number(i.amount) })
  const cats = Object.keys(byCat).sort((a, b) => byCat[b] - byCat[a])
  const daily = Array.from({ length: daysInMonth }, () => 0)
  inMonth.forEach((i) => { daily[Number(i.date.slice(8, 10)) - 1] += Number(i.amount) })
  const maxDay = Math.max(...daily, 1)
  const top = [...inMonth].sort((a, b) => Number(b.amount) - Number(a.amount)).slice(0, 5)

  return (
    <div className="ins">
      <h1>Insights</h1>
      <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
      <div className="stats">
        <div><small>Spent</small><b>{money(total)}</b></div>
        <div><small>Entries</small><b>{inMonth.length}</b></div>
        <div><small>Per day</small><b>{money(perDay)}</b></div>
        <div><small>vs last month</small><b>{change === null ? '–' : (change > 0 ? '+' : '') + change + '%'}</b></div>
      </div>
      <h2>By category</h2>
      {cats.length === 0 && <p className="empty">No spending in this month.</p>}
      {cats.map((c) => (
        <div key={c} className="catrow">
          <div className="top"><span>{c}</span><span>{money(byCat[c])} · {Math.round((byCat[c] / total) * 100)}%</span></div>
          <div className="track"><div className="fillbar" style={{ width: (byCat[c] / total) * 100 + '%', background: COLORS[c] || '#888' }} /></div>
        </div>
      ))}
      <h2>Daily spending</h2>
      <div className="days">
        {daily.map((v, idx) => (
          <div key={idx} className="d" title={'Day ' + (idx + 1) + ': ' + money(v)}>
            <div className="dfill" style={{ height: Math.round((v / maxDay) * 80) + 'px' }} />
          </div>
        ))}
      </div>
      <h2>Biggest expenses</h2>
      {top.map((i) => (
        <div key={i.id} className="big">
          <span>{i.category}<small>{i.date}{i.note ? ' · ' + i.note : ''}</small></span>
          <b>{money(i.amount)}</b>
        </div>
      ))}
    </div>
  )
}
