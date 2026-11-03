import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { COLORS } from './Donut'

const CATS = Object.keys(COLORS)
const money = (n) => '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export default function Budgets({ byCat }) {
  const [limits, setLimits] = useState({})
  const [cat, setCat] = useState('Food')
  const [amt, setAmt] = useState('')
  const [msg, setMsg] = useState('')

  async function load() {
    const { data } = await supabase.from('budgets').select('category, amount')
    const m = {}
    for (const r of data || []) m[r.category] = Number(r.amount)
    setLimits(m)
  }
  useEffect(() => { load() }, [])

  async function save(e) {
    e.preventDefault()
    const v = parseFloat(amt)
    if (!(v > 0)) { setMsg('Type a limit above 0.'); return }
    const { error } = await supabase.from('budgets').upsert({ category: cat, amount: v }, { onConflict: 'user_id,category' })
    setMsg(error ? error.message : '')
    if (!error) { setAmt(''); load() }
  }

  async function remove(c) {
    await supabase.from('budgets').delete().eq('category', c)
    load()
  }

  const rows = Object.keys(limits)
  return (
    <div>
      <h2>Budgets</h2>
      {rows.length === 0 && <p className="empty">No budgets yet. Set a monthly limit below.</p>}
      {rows.map((c) => {
        const spent = byCat[c] || 0
        const pct = Math.round((spent / limits[c]) * 100)
        const col = pct >= 100 ? '#e5484d' : pct >= 80 ? '#f2a900' : '#3fae7a'
        return (
          <div key={c} className="catrow">
            <div className="top"><span>{c}</span><span>{money(spent)} of {money(limits[c])}</span></div>
            <div className="track"><div className="fillbar" style={{ width: Math.min(pct, 100) + '%', background: col }} /></div>
            <div className="top bsub"><span>{pct >= 100 ? 'Over by ' + money(spent - limits[c]) : money(limits[c] - spent) + ' left'}</span><button className="rm" onClick={() => remove(c)}>Remove</button></div>
          </div>
        )
      })}
      <form onSubmit={save} className="bform">
        <select value={cat} onChange={(e) => setCat(e.target.value)}>
          {CATS.map((c) => <option key={c}>{c}</option>)}
        </select>
        <input type="number" step="0.01" min="0.01" placeholder="Monthly limit" value={amt} onChange={(e) => setAmt(e.target.value)} />
        <button className="add" type="submit">Set budget</button>
      </form>
      {msg && <p className="msg">{msg}</p>}
    </div>
  )
}
