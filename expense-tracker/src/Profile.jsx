import { t, setLang, loc, LANGS } from './i18n'
import { useState } from 'react'
import { getTheme, setTheme } from './theme'
import { SYMBOLS, NAMES, cur } from './currency'
import { supabase } from './supabase'

export default function Profile({ session, items }) {
  const user = session.user
  const [name, setName] = useState((user.user_metadata && user.user_metadata.name) || '')
  const [pw, setPw] = useState('')
  const [theme, setThemeState] = useState(getTheme())
  const [currency, setCurrency] = useState((user.user_metadata && user.user_metadata.currency) || 'USD')
  const [msg, setMsg] = useState('')
  const [language, setLanguage] = useState((user.user_metadata && user.user_metadata.language) || 'en')
  const total = items.reduce((s, i) => s + Number(i.amount), 0)
  const since = new Date(user.created_at).toLocaleDateString(loc(), { month: 'short', year: 'numeric' })
  const initial = (name || user.email || '?')[0].toUpperCase()

  async function saveName(e) {
    e.preventDefault()
    const { error } = await supabase.auth.updateUser({ data: { name, currency, language } })
    if (!error) setLang(language)
    setMsg(error ? error.message : t('Profile saved.'))
  }

  async function changePw(e) {
    e.preventDefault()
    if (pw.length < 6) { setMsg(t('Password needs 6 or more characters.')); return }
    const { error } = await supabase.auth.updateUser({ password: pw })
    setMsg(error ? error.message : t('Password changed.'))
    if (!error) setPw('')
  }

  return (
    <div className="ins">
      <h1>{t('Profile')}</h1>
      <div className="who">
        <div className="av">{initial}</div>
        <div><b>{name || t('No name yet')}</b><div className="mu">{user.email}</div></div>
      </div>
      <div className="stats3">
        <div><small>{t('Member since')}</small><b>{since}</b></div>
        <div><small>{t('Entries')}</small><b>{items.length}</b></div>
        <div><small>{t('Total tracked')}</small><b>{cur()}{total.toLocaleString('en-US', { maximumFractionDigits: 0 })}</b></div>
      </div>
      <form onSubmit={saveName}>
        <input placeholder={t('Display name')} value={name} onChange={(e) => setName(e.target.value)} />
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>{Object.keys(SYMBOLS).map((c) => <option key={c} value={c}>{c} ({SYMBOLS[c].trim()}) · {NAMES[c]}</option>)}</select>
        <select value={theme} aria-label={t('Theme')} onChange={(e) => { setThemeState(e.target.value); setTheme(e.target.value) }}><option value="light">{t('Light')}</option><option value="dark">{t('Dark')}</option></select>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>{Object.keys(LANGS).map((c) => <option key={c} value={c}>{LANGS[c]}</option>)}</select>
        <button className="add" type="submit">{t('Save profile')}</button>
      </form>
      <form onSubmit={changePw}>
        <input type="password" placeholder={t('New password (6+ characters)')} value={pw} onChange={(e) => setPw(e.target.value)} />
        <button className="ghost" type="submit">{t('Change password')}</button>
      </form>
      {msg && <p className="msg">{msg}</p>}
    </div>
  )
}
