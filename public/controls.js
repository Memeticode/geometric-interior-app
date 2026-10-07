// Slider sections in the sidebar. Each control maps to config[section][key].
// Titles, descriptions, names, and tooltips live in the locale files
// (public/i18n/*.js) under groups.<group key> and controls.<control key>.

const unit = { min: 0, max: 1, step: 0.01 };
const seed = { min: 0, max: 17, step: 1 };

export const groups = [
    {
        key: 'seed',
        section: 'seed',
        controls: [
            { key: 'arrangement', ...seed },
            { key: 'structure', ...seed },
            { key: 'detail', ...seed },
        ],
    },
    {
        key: 'geometry',
        section: 'controls',
        controls: [
            { key: 'density', ...unit, gradient: 'linear-gradient(to right, transparent, rgba(180,130,255,0.4))' },
            { key: 'fracture', ...unit, gradient: 'linear-gradient(to right, rgba(100,160,255,0.3), rgba(255,100,80,0.4))' },
            { key: 'scale', ...unit, gradient: 'linear-gradient(to right, rgba(180,130,255,0.2), rgba(180,130,255,0.5))' },
            { key: 'division', ...unit, gradient: 'linear-gradient(to right, rgba(140,180,255,0.25), rgba(200,140,255,0.45))' },
            { key: 'faceting', ...unit, gradient: 'linear-gradient(to right, rgba(160,200,255,0.25), rgba(220,180,255,0.45))' },
        ],
    },
    {
        key: 'light',
        section: 'controls',
        controls: [
            { key: 'luminosity', ...unit, gradient: 'linear-gradient(to right, rgba(20,10,40,0.5), rgba(255,240,200,0.5))' },
            { key: 'bloom', ...unit, gradient: 'linear-gradient(to right, transparent, rgba(255,200,255,0.45))' },
        ],
    },
    {
        key: 'color',
        section: 'controls',
        controls: [
            { key: 'hue', ...unit, gradient: 'linear-gradient(to right, rgba(255,80,80,0.4), rgba(255,200,50,0.4), rgba(80,255,80,0.4), rgba(80,200,255,0.4), rgba(180,130,255,0.4), rgba(255,80,80,0.4))' },
            { key: 'spectrum', ...unit, gradient: 'linear-gradient(to right, rgba(180,130,255,0.3), rgba(255,180,100,0.3), rgba(100,200,255,0.3))' },
            { key: 'chroma', ...unit, gradient: 'linear-gradient(to right, rgba(160,160,160,0.3), rgba(255,100,200,0.45))' },
        ],
    },
    {
        key: 'space',
        section: 'controls',
        controls: [
            { key: 'coherence', ...unit, gradient: 'linear-gradient(to right, rgba(255,120,80,0.35), rgba(100,180,255,0.35))' },
            { key: 'flow', ...unit, gradient: 'linear-gradient(to right, rgba(140,140,180,0.3), rgba(100,220,200,0.4))' },
        ],
    },
    {
        key: 'camera',
        section: 'camera',
        controls: [
            { key: 'zoom', min: -100, max: 100, step: 1, gradient: 'linear-gradient(to right, rgba(130,130,180,0.25), rgba(180,130,255,0.45))' },
            { key: 'rotation', min: -180, max: 180, step: 1, suffix: '°', gradient: 'linear-gradient(to right, rgba(180,130,255,0.3), rgba(130,180,255,0.3), rgba(180,130,255,0.3))' },
            { key: 'elevation', min: -90, max: 90, step: 1, suffix: '°', gradient: 'linear-gradient(to right, rgba(100,130,200,0.3), rgba(200,160,255,0.4))' },
        ],
    },
];
