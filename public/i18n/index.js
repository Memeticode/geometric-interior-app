// Page translations. Each locale file default-exports a nested strings
// object; elements opt in with data-i18n (text) or data-i18n-aria-label.
// Locale codes match the library's, so one choice drives both the page and
// the generated text.

export const locales = ['en', 'es', 'fr', 'it', 'zh', 'ru'];

// <html lang> values; the library's 'zh' is Simplified Chinese.
const htmlLang = { zh: 'zh-Hans' };

let strings = {};

export async function setLocale(locale) {
    strings = (await import(`./${locale}.js`)).default;
    const root = document.documentElement;
    root.lang = htmlLang[locale] ?? locale;
    root.dataset.locale = locale;
    document.querySelector('meta[name="description"]').content = t('meta.description');
    for (const el of document.querySelectorAll('[data-i18n]')) {
        el.textContent = t(el.dataset.i18n);
    }
    for (const el of document.querySelectorAll('[data-i18n-aria-label]')) {
        el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel));
    }
}

// Looks up a dotted key, e.g. t('controls.hue.name'), filling {placeholders}.
export function t(key, vars = {}) {
    const value = key.split('.').reduce((node, part) => node?.[part], strings);
    if (typeof value !== 'string') return value ?? key;
    return value.replace(/\{(\w+)\}/g, (match, name) => vars[name] ?? match);
}
