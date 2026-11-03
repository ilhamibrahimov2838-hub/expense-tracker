import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import Charts from './Charts'; import Side from './Side'; import Insights from './Insights'; import Year from './Year'; import Profile from './Profile'; import './App.css'

const CATEGORIES = ['Food', 'Transport', 'Housing', 'Bills', 'Health', 'Fun', 'Shopping', 'Other']

export default function App() {
  const today = new Date().toLocaleDateString('en-CA')
  const [session, setSession] = useState(null)
  const [ready, setReady] = useState(false); const [tab, setTab] = useState('expenses')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [items, setItems] = useState([])
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState(today)
  const [note, setNote] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setReady(true)
    })
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) loadItems()
    else setItems([])
  }, [session])

  async function loadItems() {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('date', { ascending: false })
      .order('id', { ascending: false })
    if (error) setMessage(error.message)
    else setItems(data)
  }

  async function signUp() {
    setMessage('')
    if (email === '' || password.length < 6) { setMessage('Type your email and a password of 6+ characters first.'); return }
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage(error.message)
    else if (!data.session) setMessage('Check your email to confirm, then log in.')
  }

  async function logIn(e) {
    e.preventDefault()
    setMessage('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
  }

  async function addItem(e) {
    e.preventDefault()
    const value = parseFloat(amount)
    if (!(value > 0)) return
    const { error } = await supabase.from('expenses').insert({ amount: value, category, date, note })
    if (error) { setMessage(error.message); return }
    setAmount('')
    setNote('')
    loadItems()
  }

  async function removeItem(id) {
    await supabase.from('expenses').delete().eq('id', id)
    loadItems()
  }

  const total = items.reduce((sum, item) => sum + Number(item.amount), 0)

  if (!ready) return null

  if (!session) {
    return (
      <>
        <h1>Expense Tracker</h1>
        <form onSubmit={logIn}>
          <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" required minLength={6} placeholder="Password (6+ characters)" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="add" type="submit">Log in</button>
          <button className="link" type="button" onClick={signUp}>Create account</button>
        </form>
        {message && <p className="msg">{message}</p>}
      </>
    )
  }

  return (
    <>
      <h1>Expense Tracker</h1>
      <Side tab={tab} setTab={setTab} />
      {tab === "insights" ? <Insights items={items} /> : tab === "year" ? <Year items={items} /> : tab === "profile" ? <Profile session={session} items={items} /> : <>
      <form onSubmit={addItem}>
        <input type="number" step="0.01" required placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input type="date" required min="2000-01-01" max={today} value={date} onChange={(e) => setDate(e.target.value)} />
        <input placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
        <button className="add" type="submit">Add expense</button>
      </form>

      {message && <p className="msg">{message}</p>}
      <p className="total">Total: ${total.toFixed(2)}</p>

      {items.length === 0 ? (
        <p className="empty">No expenses yet. Add your first one above.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <div>
                ${Number(item.amount).toFixed(2)} · {item.category}
                <small>{item.date}{item.note ? ' · ' + item.note : ''}</small>
              </div>
              <button className="del" onClick={() => removeItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      </>}
    </>
  )
}
