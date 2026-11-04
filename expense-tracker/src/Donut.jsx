import { cur } from './currency'

export const COLORS = {
  Food: '#e4572e', Transport: '#2e86de', Housing: '#8e5bd4', Bills: '#f2a900',
  Health: '#17a589', Fun: '#d6409f', Shopping: '#5d7b8a', Other: '#9a8c7a',
}

const short = (n) => (n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e4 ? Math.round(n / 1e3) + 'k' : String(Math.round(n)))

export default function Donut({ data, size = 160, color }) {
  const cats = Object.keys(data).filter((c) => data[c] > 0).sort((a, b) => data[b] - data[a])
  const total = cats.reduce((s, c) => s + data[c], 0)
  let acc = 0
  const stops = cats.map((c) => {
    const from = acc
    acc += (data[c] / total) * 100
    return (color || COLORS[c] || '#888') + ' ' + from + '% ' + acc + '%'
  }).join(',')

  return (
    <div className="dn" style={{ width: size, height: size, boxShadow: color && total > 0 ? '0 0 8px ' + color + '44' : 'none', background: total > 0 ? 'conic-gradient(' + stops + ')' : 'var(--track)' }}>
      <b style={{ fontSize: Math.max(11, size * 0.13) }}>{total > 0 ? cur() + short(total) : '–'}</b>
    </div>
  )
}
