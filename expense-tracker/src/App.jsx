import { t, setLang } from './i18n'
import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import './theme'
import Hero from './Hero'
import { setCur, cur } from './currency'
import Charts from './Charts'; import Side from './Side'; import Insights from './Insights'; import Year from './Year'; import Profile from './Profile'; import './App.css'

const CATEGORIES = ['Food', 'Transport', 'Housing', 'Bills', 'Health', 'Fun', 'Shopping', 'Other']

export default function App() {
  const today = new Date().toLocaleDateString('en-CA')
  const [session, setSession] = useState(null)
  const [ready, setReady] = useState(false); const [tab, setTab] = useState('expenses'); const [editId, setEditId] = useState(null)
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
    const { data } = supabase.auth.onAuthStateChange((ev, s) => { setSession(s); if (ev === 'PASSWORD_RECOVERY') setTab('profile') })
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
    if (email === '' || password.length < 6) { setMessage(t('Type your email and a password of 6+ characters first.')); return }
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage(error.message)
    else if (!data.session) setMessage(t('Check your email to confirm, then log in.'))
  }

  async function forgot() {
    if (email === '') { setMessage(t('Type your email first, then click Forgot password.')); return }
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin })
    setMessage(error ? error.message : t('Check your email for a reset link.'))
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
    const row = { amount: value, category, date, note }
    const { error } = editId ? await supabase.from('expenses').update(row).eq('id', editId) : await supabase.from('expenses').insert(row)
    if (error) { setMessage(error.message); return }
    setAmount('')
    setNote('')
    if (editId) setDate(today)
    setEditId(null)
    loadItems()
  }

  async function removeItem(id) {
    await supabase.from('expenses').delete().eq('id', id)
    loadItems()
  }

  const total = items.reduce((sum, item) => sum + Number(item.amount), 0)
  setCur(session && session.user.user_metadata ? session.user.user_metadata.currency : undefined)
  setLang(session ? (session.user.user_metadata || {}).language || 'en' : undefined)

  if (!ready) return null

  if (!session) {
    return (
      <>
        <h1>{t('Expense Tracker')}</h1>
        <form onSubmit={logIn}>
          <input type="email" required placeholder={t('Email')} value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" required minLength={6} placeholder={t('Password (6+ characters)')} value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="add" type="submit">{t('Log in')}</button>
          <button className="link" type="button" onClick={signUp}>{t('Create account')}</button>
          <button className="link" type="button" onClick={forgot}>{t('Forgot password?')}</button>
        </form>
        {message && <p className="msg">{message}</p>}
      </>
    )
  }

  return (
    <>
      <h1>{t('Expense Tracker')}</h1>
      <Side tab={tab} setTab={setTab} />
      {tab === "insights" ? <Insights items={items} /> : tab === "year" ? <Year items={items} /> : tab === "profile" ? <Profile session={session} items={items} /> : <>
      <Hero items={items} />
      <form onSubmit={addItem}>
        <input type="number" step="0.01" required placeholder={t('Amount')} value={amount} onChange={(e) => setAmount(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{t(c)}</option>
          ))}
        </select>
        <input type="date" required min="2000-01-01" max={today} value={date} onChange={(e) => setDate(e.target.value)} />
        <input placeholder={t('Note (optional)')} value={note} onChange={(e) => setNote(e.target.value)} />
        <button className="add" type="submit">{editId ? t('Save changes') : t('Add expense')}</button>{editId && <button className="link" type="button" onClick={() => { setEditId(null); setAmount(''); setNote(''); setDate(today) }}>{t('Cancel')}</button>}
      </form>

      {message && <p className="msg">{message}</p>}
      <p className="total">{t('Total')}: {cur()}{total.toFixed(2)}</p>

      {items.length === 0 ? (
        <p className="empty">{t('No expenses yet. Add your first one above.')}</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <div>
                {cur()}{Number(item.amount).toFixed(2)} · {t(item.category)}
                <small>{item.date}{item.note ? ' · ' + item.note : ''}</small>
              </div>
              <button className="ed" onClick={() => { setEditId(item.id); setAmount(String(item.amount)); setCategory(item.category); setDate(item.date); setNote(item.note || ''); window.scrollTo(0, 0) }}>{t('Edit')}</button><button className="del" onClick={() => removeItem(item.id)}>{t('Delete')}</button>
            </li>
          ))}
        </ul>
      )}

      </>}
    </>
  )
}
