export const getTheme = () => {
  try { return localStorage.getItem('theme') || 'light' } catch (e) { return 'light' }
}

export const setTheme = (mode) => {
  try { localStorage.setItem('theme', mode) } catch (e) { /* ignore */ }
  document.body.dataset.theme = mode
}

document.body.dataset.theme = getTheme()
