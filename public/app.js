import {
    renderStill,
    parseRenderStillConfig,
    randomRenderStillConfig,
} from '@memeticode/geometric-interior';
import { groups } from './controls.js';
import { setLocale, t } from './i18n/index.js';
import { initTheme } from './theme.js';
import './tooltip.js';

const form = document.getElementById('controls');
const status = document.getElementById('status');
const stage = document.querySelector('.stage');
const figure = stage.querySelector('figure');
const image = document.getElementById('image');
const download = document.getElementById('download');
const localeSelect = form.elements.locale;

initTheme(document.getElementById('theme'));

// ── Build the slider sections ──
// Static text uses data-i18n; per-slider labels that need the control's
// name filled in are set in translateSliders().

const sliders = []; // { section, key, range, value, info, tip, setValue }

function decimals(step) {
    return String(step).split('.')[1]?.length ?? 0;
}

function buildSlider(section, def, container) {
    const id = `${section}-${def.key}`;
    const format = value => Number(value).toFixed(decimals(def.step)) + (def.suffix ?? '');

    const row = document.createElement('div');
    row.className = 'slider-row';
    row.innerHTML = `
        <span class="slider-name">
            <label for="${id}" data-i18n="controls.${def.key}.name"></label>
            <button type="button" class="info">i</button>
        </span>
        <input type="range" id="${id}" min="${def.min}" max="${def.max}" step="${def.step}" aria-describedby="${id}-tip">
        <input type="text" class="slider-value" inputmode="decimal">
        <span id="${id}-tip" hidden></span>`;

    const range = row.querySelector('input[type="range"]');
    const value = row.querySelector('.slider-value');
    if (def.gradient) range.style.setProperty('--track', def.gradient);

    const setValue = v => {
        range.value = v;
        value.value = format(range.value);
    };

    range.addEventListener('input', () => { value.value = format(range.value); });

    // Typed values are clamped to the range and snapped to the step. Commas
    // are accepted as decimal separators, as many locales type them.
    function commit() {
        let num = parseFloat(value.value.replace(',', '.').replace(/[^\d.+-]/g, ''));
        if (Number.isNaN(num)) num = Number(range.value);
        num = Math.min(def.max, Math.max(def.min, Math.round(num / def.step) * def.step));
        setValue(num.toFixed(decimals(def.step)));
        scheduleRender();
    }
    value.addEventListener('change', commit);
    value.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            commit();
        }
    });

    container.append(row);
    sliders.push({
        section,
        key: def.key,
        range,
        value,
        info: row.querySelector('.info'),
        tip: row.querySelector(`#${id}-tip`),
        setValue,
    });
}

const sectionsEl = document.getElementById('sections');
for (const group of groups) {
    const details = document.createElement('details');
    details.className = 'section';
    details.open = true;
    details.innerHTML = `
        <summary data-i18n="groups.${group.key}.title"></summary>
        <p class="section-description" data-i18n="groups.${group.key}.description"></p>
        <div class="sliders"></div>`;
    const container = details.querySelector('.sliders');
    for (const def of group.controls) buildSlider(group.section, def, container);
    sectionsEl.append(details);
}

// ── Translation ──

function translateSliders() {
    for (const { key, value, info, tip } of sliders) {
        const name = t(`controls.${key}.name`);
        const text = t(`controls.${key}.tip`);
        info.setAttribute('aria-label', t('slider.about', { name }));
        info.dataset.tip = text;
        tip.textContent = text;
        value.setAttribute('aria-label', t('slider.value', { name }));
    }
}

// Paragraphs come from the locale file as plain text; \n is a line break.
function renderStatement() {
    const body = document.querySelector('#statement .modal-body');
    body.replaceChildren(...t('statement.paragraphs').map(text => {
        const p = document.createElement('p');
        text.split('\n').forEach((line, i) => {
            if (i > 0) p.append(document.createElement('br'));
            p.append(line);
        });
        return p;
    }));
}

async function applyLocale(locale) {
    await setLocale(locale);
    translateSliders();
    renderStatement();
    if (figure.hidden && !status.textContent.trim()) status.textContent = t('status.rendering');
}

// The page language and the generated text's language are one setting.
// The select sits in the header but belongs to the form (form="controls"),
// so readForm() picks it up; its events don't bubble through the form, so
// it gets its own listener.
localeSelect.addEventListener('change', async () => {
    try {
        localStorage.setItem('locale', localeSelect.value);
    } catch {}
    await applyLocale(localeSelect.value);
    scheduleRender(0);
});

// ── Form <-> config ──

function readForm() {
    const config = {
        locale: localeSelect.value,
        aspect: form.elements.aspect.value,
        height: Number(form.elements.height.value),
        seed: {},
        controls: {},
        camera: {},
    };
    for (const { section, key, range } of sliders) {
        config[section][key] = Number(range.value);
    }
    return config;
}

function writeForm(config) {
    localeSelect.value = config.locale;
    form.elements.aspect.value = config.aspect;
    form.elements.height.value = config.height;
    for (const { section, key, setValue } of sliders) {
        setValue(config[section][key]);
    }
}

// The URL hash holds the config as JSON, so any image can be shared by link.
function configFromHash() {
    if (!location.hash) return null;
    try {
        const result = parseRenderStillConfig(JSON.parse(decodeURIComponent(location.hash.slice(1))));
        return result.ok ? result.config : null;
    } catch {
        return null;
    }
}

// ── Rendering ──

// Renders run one at a time. A change that arrives mid-render queues exactly
// one follow-up render, which reads the form afresh, so the image always
// catches up to the latest settings without piling up stale renders.
let rendering = false;
let pending = false;
let timer;

function scheduleRender(delay = 200) {
    clearTimeout(timer);
    timer = setTimeout(render, delay);
}

async function render() {
    if (rendering) {
        pending = true;
        return;
    }
    const parsed = parseRenderStillConfig(readForm());
    if (!parsed.ok) {
        status.textContent = [t('errors.invalid'), ...parsed.errors].join('\n');
        return;
    }

    rendering = true;
    stage.classList.add('busy');
    try {
        const still = await renderStill(parsed.config);
        if (image.src) URL.revokeObjectURL(image.src);
        image.src = URL.createObjectURL(still.image);
        image.width = still.width;
        image.height = still.height;
        image.alt = still.shortDescription;
        document.getElementById('title').textContent = still.title;
        document.getElementById('short').textContent = still.shortDescription;
        document.getElementById('long').textContent = still.longDescription;
        download.href = image.src;
        download.download = `${still.title}.png`;
        download.removeAttribute('aria-disabled');
        history.replaceState(null, '', '#' + encodeURIComponent(JSON.stringify(still.config)));
        figure.hidden = false;
        status.textContent = '';
    } catch (err) {
        status.textContent = err.message.startsWith('WebGL2 unavailable') ? t('errors.webgl') : err.message;
    } finally {
        rendering = false;
        if (pending) {
            pending = false;
            render();
        } else {
            stage.classList.remove('busy');
        }
    }
}

// Sliders re-render as they change. Typed slider values re-render when
// committed (see buildSlider), not per keystroke.
form.addEventListener('input', event => {
    if (!event.target.classList.contains('slider-value')) scheduleRender();
});

// Aspect and height sit in the toolbar above the image, outside the form
// element, so their events don't bubble through it.
document.getElementById('toolbar').addEventListener('input', () => scheduleRender());

// Enter in a field would otherwise submit (and reload) the page.
form.addEventListener('submit', event => event.preventDefault());

document.getElementById('randomize').addEventListener('click', () => {
    const { locale, aspect, height, camera } = readForm();
    writeForm(randomRenderStillConfig({ locale, aspect, height, camera }));
    scheduleRender(0);
});

// The URL already holds the full config, so the link is the page address.
// If the clipboard is unavailable, show the link in a prompt to copy from.
document.getElementById('copy-link').addEventListener('click', async event => {
    const button = event.currentTarget;
    try {
        await navigator.clipboard.writeText(location.href);
    } catch {
        prompt(t('actions.copyLink'), location.href);
        return;
    }
    button.textContent = t('actions.copied');
    setTimeout(() => { button.textContent = t('actions.copyLink'); }, 1500);
});

// ── Artist statement modal ──
// <dialog> handles Escape, focus trapping, and the backdrop. A click on the
// backdrop lands on the dialog element itself, so treat that as "close" too.

const statement = document.getElementById('statement');
document.getElementById('open-statement').addEventListener('click', () => statement.showModal());
statement.querySelector('.modal-close').addEventListener('click', () => statement.close());
statement.addEventListener('click', event => {
    if (event.target === statement) statement.close();
});

// ── Start ──
// The inline script in index.html already chose the locale (shared link,
// saved choice, or browser language) and hid the page if it isn't English.

const locale = document.documentElement.dataset.locale || 'en';
// A shared link reproduces its image; a clean visit starts from a random one.
writeForm(configFromHash() ?? randomRenderStillConfig({ locale, aspect: '1:1' }));
try {
    await applyLocale(locale);
} finally {
    document.documentElement.classList.remove('i18n-pending');
}
render();
