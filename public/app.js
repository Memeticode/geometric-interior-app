import {
    renderStill,
    parseRenderStillConfig,
    randomRenderStillConfig,
} from '@memeticode/geometric-interior';
import { groups } from './controls.js';
import { initTheme } from './theme.js';
import './tooltip.js';

const form = document.getElementById('controls');
const status = document.getElementById('status');
const stage = document.querySelector('.stage');
const figure = stage.querySelector('figure');
const image = document.getElementById('image');
const download = document.getElementById('download');

initTheme(document.getElementById('theme'));

// ── Build the slider sections ──

const sliders = []; // { section, key, range, setValue }

function decimals(step) {
    return String(step).split('.')[1]?.length ?? 0;
}

function buildSlider(section, def, container) {
    const id = `${section}-${def.key}`;
    const name = def.key[0].toUpperCase() + def.key.slice(1);
    const format = value => Number(value).toFixed(decimals(def.step)) + (def.suffix ?? '');

    const row = document.createElement('div');
    row.className = 'slider-row';
    row.innerHTML = `
        <span class="slider-name">
            <label for="${id}">${name}</label>
            <button type="button" class="info" aria-label="About ${def.key}">i</button>
        </span>
        <input type="range" id="${id}" min="${def.min}" max="${def.max}" step="${def.step}" aria-describedby="${id}-tip">
        <input type="text" class="slider-value" inputmode="decimal" aria-label="${name} value">
        <span id="${id}-tip" hidden></span>`;

    const info = row.querySelector('.info');
    const range = row.querySelector('input[type="range"]');
    const value = row.querySelector('.slider-value');
    info.dataset.tip = def.tip;
    row.querySelector(`#${id}-tip`).textContent = def.tip;
    if (def.gradient) range.style.setProperty('--track', def.gradient);

    const setValue = v => {
        range.value = v;
        value.value = format(range.value);
    };

    range.addEventListener('input', () => { value.value = format(range.value); });

    // Typed values are clamped to the range and snapped to the step.
    function commit() {
        let num = parseFloat(value.value.replace(/[^\d.+-]/g, ''));
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
    sliders.push({ section, key: def.key, range, setValue });
}

const sectionsEl = document.getElementById('sections');
for (const group of groups) {
    const details = document.createElement('details');
    details.className = 'section';
    details.open = true;
    details.innerHTML = `<summary>${group.title}</summary><p class="section-description"></p><div class="sliders"></div>`;
    details.querySelector('.section-description').textContent = group.description;
    const container = details.querySelector('.sliders');
    for (const def of group.controls) buildSlider(group.section, def, container);
    sectionsEl.append(details);
}

// ── Form <-> config ──

function readForm() {
    const config = {
        locale: form.elements.locale.value,
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
    form.elements.locale.value = config.locale;
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
        status.textContent = parsed.errors.join('\n');
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
        history.replaceState(null, '', '#' + encodeURIComponent(JSON.stringify(still.config)));
        figure.hidden = false;
        status.textContent = '';
    } catch (err) {
        status.textContent = err.message;
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

// Sliders, selects, and the height field re-render as they change. Typed
// slider values re-render when committed (see buildSlider), not per keystroke.
form.addEventListener('input', event => {
    if (!event.target.classList.contains('slider-value')) scheduleRender();
});

// Enter in a field would otherwise submit (and reload) the page.
form.addEventListener('submit', event => event.preventDefault());

document.getElementById('randomize').addEventListener('click', () => {
    const { locale, aspect, height, camera } = readForm();
    writeForm(randomRenderStillConfig({ locale, aspect, height, camera }));
    scheduleRender(0);
});

document.getElementById('copy-link').addEventListener('click', async event => {
    await navigator.clipboard.writeText(location.href);
    event.target.textContent = 'Copied';
    setTimeout(() => { event.target.textContent = 'Copy link'; }, 1500);
});

writeForm(configFromHash() ?? parseRenderStillConfig({}).config);
render();
