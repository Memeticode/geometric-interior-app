// System / light / dark theme switcher. "System" removes data-theme so the
// CSS follows prefers-color-scheme. The choice is remembered per browser;
// the inline script in index.html applies it before first paint.

const KEY = 'theme';

export function initTheme(container) {
    let stored = 'system';
    try {
        stored = localStorage.getItem(KEY) || 'system';
    } catch {}

    const current = container.querySelector(`input[value="${stored}"]`);
    if (current) current.checked = true;

    container.addEventListener('change', e => {
        const value = e.target.value;
        if (value === 'system') delete document.documentElement.dataset.theme;
        else document.documentElement.dataset.theme = value;
        try {
            localStorage.setItem(KEY, value);
        } catch {}
    });
}
