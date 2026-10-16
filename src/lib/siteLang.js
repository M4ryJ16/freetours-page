export function getSiteLang() {
  try {
    return localStorage.getItem('site_lang') || 'es';
  } catch {
    return 'es';
  }
}