const ROWS = {
  'Expense Tracker': ['Xərc İzləyici', 'Трекер расходов', 'Harcama Takibi'],
  'Email': ['E-poçt', 'Эл. почта', 'E-posta'],
  'Password (6+ characters)': ['Parol (6+ simvol)', 'Пароль (6+ символов)', 'Şifre (6+ karakter)'],
  'Log in': ['Daxil ol', 'Войти', 'Giriş yap'],
  'Create account': ['Hesab yarat', 'Создать аккаунт', 'Hesap oluştur'],
  'Forgot password?': ['Parolu unutmusunuz?', 'Забыли пароль?', 'Şifrenizi mi unuttunuz?'],
  'Amount': ['Məbləğ', 'Сумма', 'Tutar'],
  'Note (optional)': ['Qeyd (könüllü)', 'Заметка (необязательно)', 'Not (isteğe bağlı)'],
  'Add expense': ['Xərc əlavə et', 'Добавить расход', 'Harcama ekle'],
  'Save changes': ['Dəyişiklikləri saxla', 'Сохранить изменения', 'Değişiklikleri kaydet'],
  'Cancel': ['Ləğv et', 'Отмена', 'İptal'],
  'Total': ['Cəmi', 'Итого', 'Toplam'],
  'Edit': ['Redaktə', 'Изменить', 'Düzenle'],
  'Delete': ['Sil', 'Удалить', 'Sil'],
  'Food': ['Yemək', 'Еда', 'Yiyecek'],
  'Transport': ['Nəqliyyat', 'Транспорт', 'Ulaşım'],
  'Housing': ['Mənzil', 'Жильё', 'Konut'],
  'Bills': ['Ödənişlər', 'Счета', 'Faturalar'],
  'Health': ['Sağlamlıq', 'Здоровье', 'Sağlık'],
  'Fun': ['Əyləncə', 'Развлечения', 'Eğlence'],
  'Shopping': ['Alış-veriş', 'Покупки', 'Alışveriş'],
  'Other': ['Digər', 'Другое', 'Diğer'],
  'Expenses': ['Xərclər', 'Расходы', 'Harcamalar'],
  'Insights': ['Təhlil', 'Аналитика', 'Analiz'],
  'Year': ['İl', 'Год', 'Yıl'],
  'Profile': ['Profil', 'Профиль', 'Profil'],
  'Log out': ['Çıxış', 'Выйти', 'Çıkış yap'],
  'No expenses yet. Add your first one above.': ['Hələ xərc yoxdur. İlk xərcinizi yuxarıda əlavə edin.', 'Расходов пока нет. Добавьте первый выше.', 'Henüz harcama yok. İlkini yukarıdan ekleyin.'],
  'Check your email to confirm, then log in.': ['Təsdiq üçün e-poçtunuzu yoxlayın, sonra daxil olun.', 'Проверьте почту для подтверждения, затем войдите.', 'Onay için e-postanızı kontrol edin, sonra giriş yapın.'],
  'Type your email and a password of 6+ characters first.': ['Əvvəlcə e-poçtunuzu və 6+ simvollu parol yazın.', 'Сначала введите почту и пароль из 6+ символов.', 'Önce e-postanızı ve 6+ karakterli bir şifre yazın.'],
  'Type your email first, then click Forgot password.': ['Əvvəlcə e-poçtunuzu yazın, sonra “Parolu unutmusunuz?” düyməsinə basın.', 'Сначала введите почту, затем нажмите «Забыли пароль?».', 'Önce e-postanızı yazın, sonra “Şifrenizi mi unuttunuz?” bağlantısına tıklayın.'],
  'Check your email for a reset link.': ['Sıfırlama linki üçün e-poçtunuzu yoxlayın.', 'Проверьте почту: мы отправили ссылку для сброса.', 'Sıfırlama bağlantısı için e-postanızı kontrol edin.'],
  'Spent': ['Xərclənib', 'Потрачено', 'Harcanan'],
  'Entries': ['Qeydlər', 'Записи', 'Kayıtlar'],
  'Per day': ['Gündəlik', 'В день', 'Günlük'],
  'vs last month': ['keçən aya görə', 'к прошлому месяцу', 'geçen aya göre'],
  'By category': ['Kateqoriyaya görə', 'По категориям', 'Kategoriye göre'],
  'No spending in this month.': ['Bu ayda xərc yoxdur.', 'В этом месяце расходов нет.', 'Bu ay harcama yok.'],
  'Daily spending': ['Gündəlik xərclər', 'Расходы по дням', 'Günlük harcamalar'],
  'Biggest expenses': ['Ən böyük xərclər', 'Крупнейшие расходы', 'En büyük harcamalar'],
  'Day': ['Gün', 'День', 'Gün'],
  'Spent per month': ['Aylıq xərclər', 'Расходы по месяцам', 'Aylık harcamalar'],
  'Each month': ['Hər ay', 'Каждый месяц', 'Her ay'],
  'Budgets': ['Büdcələr', 'Бюджеты', 'Bütçeler'],
  'No budgets yet. Set a monthly limit below.': ['Hələ büdcə yoxdur. Aşağıda aylıq limit təyin edin.', 'Бюджетов пока нет. Задайте месячный лимит ниже.', 'Henüz bütçe yok. Aşağıdan aylık limit belirleyin.'],
  'of': ['/', 'из', '/'],
  'Over by': ['Limitdən artıq', 'Превышено на', 'Aşım'],
  'left': ['qalıb', 'осталось', 'kaldı'],
  'Remove': ['Çıxar', 'Убрать', 'Kaldır'],
  'Monthly limit': ['Aylıq limit', 'Месячный лимит', 'Aylık limit'],
  'Set budget': ['Büdcə təyin et', 'Задать бюджет', 'Bütçe belirle'],
  'Type a limit above 0.': ['0-dan böyük limit yazın.', 'Введите лимит больше 0.', '0’dan büyük bir limit yazın.'],
  'No name yet': ['Hələ ad yoxdur', 'Имя не указано', 'Henüz ad yok'],
  'Member since': ['Üzvlük tarixi', 'С нами с', 'Üyelik tarihi'],
  'Total tracked': ['Cəmi izlənilib', 'Всего учтено', 'Toplam takip'],
  'Display name': ['Göstərilən ad', 'Отображаемое имя', 'Görünen ad'],
  'Save profile': ['Profili saxla', 'Сохранить профиль', 'Profili kaydet'],
  'New password (6+ characters)': ['Yeni parol (6+ simvol)', 'Новый пароль (6+ символов)', 'Yeni şifre (6+ karakter)'],
  'Change password': ['Parolu dəyiş', 'Сменить пароль', 'Şifreyi değiştir'],
  'Profile saved.': ['Profil saxlanıldı.', 'Профиль сохранён.', 'Profil kaydedildi.'],
  'Password needs 6 or more characters.': ['Parol 6 və ya daha çox simvol olmalıdır.', 'Пароль должен содержать не менее 6 символов.', 'Şifre 6 veya daha fazla karakter olmalı.'],
  'Password changed.': ['Parol dəyişdirildi.', 'Пароль изменён.', 'Şifre değiştirildi.'],
}

export const LANGS = { en: 'English', az: 'Azərbaycanca', ru: 'Русский', tr: 'Türkçe' }
const CODES = ['az', 'ru', 'tr']
const DICT = { az: {}, ru: {}, tr: {} }
Object.keys(ROWS).forEach((k) => CODES.forEach((c, i) => { DICT[c][k] = ROWS[k][i] }))

let lang = 'en'
try { lang = localStorage.getItem('lang') || 'en' } catch (e) { lang = 'en' }
export const setLang = (code) => {
  if (code && LANGS[code]) {
    lang = code
    try { localStorage.setItem('lang', code) } catch (e) { lang = code }
  }
}
export const loc = () => lang
export const t = (s) => (DICT[lang] && DICT[lang][s]) || s
export const monthNames = () => Array.from({ length: 12 }, (_, i) => new Date(2000, i, 1).toLocaleDateString(lang, { month: 'short' }))
