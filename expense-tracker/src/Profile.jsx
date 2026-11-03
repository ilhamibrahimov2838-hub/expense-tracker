import { useState } from 'react'
import { supabase } from './supabase'

export default function Profile({ session, items }) {
  const user = session.user
  const [name, setName] = useState((user.user_metadata && user.user_metadata.name) || '')
  const [pw, setPw] = useState('')
  const [msg, setMsg] = useState('')
  const total = items.reduce((s, i) => s + Number(i.amount), 0)
  const since = new Date(user.created_at).toLocaleDateString('en', { month: 'short', year: 'numeric' })
  const initial = (name || user.email || '?')[0].toUpperCase()

  async function saveName(e) {
    e.preventDefault()
    const { error } = await supabase.auth.updateUser({ data: { name } })
    setMsg(error ? error.message : 'Profile saved.')
  }

  async function changePw(e) {
    e.preventDefault()
    if (pw.length < 6) { setMsg('Password needs 6 or more characters.'); return }
    const { error } = await supabase.auth.updateUser({ password: pw })
    setMsg(error ? error.message : 'Password changed.')
    if (!error) setPw('')
  }

  return (
    <div className="ins">
      <h1>Profile</h1>
      <div className="who">
        <div className="av">{initial}</div>
        <div><b>{name || 'No name yet'}</b><div className="mu">{user.email}</div></div>
      </div>
      <div className="stats3">
        <div><small>Member since</small><b>{since}</b></div>
        <div><small>Entries</small><b>{items.length}</b></div>
        <div><small>Total tracked</small><b>${total.toLocaleString('en-US', { maximumFractionDigits: 0 })}</b></div>
      </div>
      <form onSubmit={saveName}>
        <input placeholder="Display name" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="add" type="submit">Save profile</button>
      </form>
      <form onSubmit={changePw}>
        <input type="password" placeholder="New password (6+ characters)" value={pw} onChange={(e) => setPw(e.target.value)} />
        <button className="ghost" type="submit">Change password</button>
      </form>
      {msg && <p className="msg">{msg}</p>}
    </div>
  )
}
