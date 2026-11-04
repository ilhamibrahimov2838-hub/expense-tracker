export const SYMBOLS = {
  USD: '$', EUR: '€', GBP: '£', AZN: '₼', TRY: '₺', RUB: '₽', JPY: '¥', CNY: 'CN¥',
  INR: '₹', KRW: '₩', CAD: 'CA$', AUD: 'A$', CHF: 'CHF ', GEL: '₾', KZT: '₸', AED: 'AED ',
}

let sym = '$'
export const setCur = (code) => { sym = SYMBOLS[code] || '$' }
export const cur = () => sym

export const NAMES = {
  USD: 'United States', EUR: 'Eurozone', GBP: 'United Kingdom', AZN: 'Azerbaijan', TRY: 'Turkey', RUB: 'Russia', JPY: 'Japan', CNY: 'China',
  INR: 'India', KRW: 'South Korea', CAD: 'Canada', AUD: 'Australia', CHF: 'Switzerland', GEL: 'Georgia', KZT: 'Kazakhstan', AED: 'United Arab Emirates',
}
