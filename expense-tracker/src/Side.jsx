import { useEffect, useState } from 'react'
import { supabase } from './supabase'

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24"><path d={d} /></svg>
)

export default function Side({ tab, setTab }) {
  const [open, setOpen] = useState(true)
  useEffect(() => {
    document.body.dataset.side = open ? 'open' : 'closed'
    return () => { delete document.body.dataset.side }
  }, [open])

  const item = (id, label, d) => (
    <button className={'item' + (tab === id ? ' on' : '')} onClick={() => setTab(id)} title={label}>
      <Icon d={d} /><span className="lbl">{label}</span>
    </button>
  )

  return (
    <nav className="side">
      <div className="brand">
        <button className="tog" onClick={() => setOpen(!open)} title="Toggle sidebar">
          <Icon d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM9 4v16" />
        </button>
        <span className="lbl name">Ledger</span>
      </div>
      {item('expenses', 'Expenses', 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01')}
      {item('insights', 'Insights', 'M3 3v18h18M8 17v-6M13 17V7M18 17v-4')}
      <div className="sp" />
      <button className="item" onClick={() => supabase.auth.signOut()} title="Log out">
        <Icon d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
        <span className="lbl">Log out</span>
      </button>
    </nav>
  )
}
