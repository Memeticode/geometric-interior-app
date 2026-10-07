// Definitions for the slider sections in the sidebar. Each control maps to
// config[section][key]. Tooltip text is adapted from the original
// Geometric Interior app.

const unit = { min: 0, max: 1, step: 0.01 };
const seed = { min: 0, max: 17, step: 1 };

export const groups = [
    {
        title: 'Seed',
        description: 'Three independent random streams. The same seed always gives the same composition.',
        section: 'seed',
        controls: [
            { key: 'arrangement', ...seed, tip: 'Where elements are placed: the spatial flow of the composition. Changing it leaves structure and detail unchanged.' },
            { key: 'structure', ...seed, tip: 'The shape of the folded planes: their geometric character. Changing it leaves arrangement and detail unchanged.' },
            { key: 'detail', ...seed, tip: 'Color variation and fine detail: the light and color energy. Changing it leaves arrangement and structure unchanged.' },
        ],
    },
    {
        title: 'Geometry',
        description: 'The physical character of forms: abundance, fragmentation, granularity, and crystal quality.',
        section: 'controls',
        controls: [
            {
                key: 'density', ...unit,
                gradient: 'linear-gradient(to right, transparent, rgba(180,130,255,0.4))',
                tip: 'Abundance: how populated the space is. At 0, roughly 100 elements, a sparse, intimate composition where individual forms are distinct. At 1, over 1,000 elements fill the space.',
            },
            {
                key: 'fracture', ...unit,
                gradient: 'linear-gradient(to right, rgba(100,160,255,0.3), rgba(255,100,80,0.4))',
                tip: 'Fragmentation: how shattered or whole the geometry is. At 0, compact and whole. At 1, scattered shards.',
            },
            {
                key: 'scale', ...unit,
                gradient: 'linear-gradient(to right, rgba(180,130,255,0.2), rgba(180,130,255,0.5))',
                tip: 'Granularity: the size distribution of elements, without changing their total count. At low values, a few bold geometric forms dominate. At high values, a cloud of fine particles.',
            },
            {
                key: 'division', ...unit,
                gradient: 'linear-gradient(to right, rgba(140,180,255,0.25), rgba(200,140,255,0.45))',
                tip: 'Topology: the form’s large-scale shape. At low values, a single unified mass. At the midpoint, two lobes. At high values, three lobes in a triangular arrangement.',
            },
            {
                key: 'faceting', ...unit,
                gradient: 'linear-gradient(to right, rgba(160,200,255,0.25), rgba(220,180,255,0.45))',
                tip: 'Crystal character: the quality of individual faces. Determines whether shards read as broad, smooth panels or sharp, angular crystals.',
            },
        ],
    },
    {
        title: 'Light',
        description: 'The energy and emanation of the scene: how bright, and how far light reaches.',
        section: 'controls',
        controls: [
            {
                key: 'luminosity', ...unit,
                gradient: 'linear-gradient(to right, rgba(20,10,40,0.5), rgba(255,240,200,0.5))',
                tip: 'Energy: the overall brightness and glow intensity. At 0, scenes are dim but clearly visible, preserving color and structure. At 1, scenes are bright but not blown white.',
            },
            {
                key: 'bloom', ...unit,
                gradient: 'linear-gradient(to right, transparent, rgba(255,200,255,0.45))',
                tip: 'Emanation: how far light reaches beyond its sources. At 0, light stays tight to its sources in precise pools. At 1, light bleeds outward, wrapping forms in soft halos.',
            },
        ],
    },
    {
        title: 'Color',
        description: 'The chromatic identity of the emitted light: hue, spectral range, and intensity.',
        section: 'controls',
        controls: [
            {
                key: 'hue', ...unit,
                gradient: 'linear-gradient(to right, rgba(255,80,80,0.4), rgba(255,200,50,0.4), rgba(80,255,80,0.4), rgba(80,200,255,0.4), rgba(180,130,255,0.4), rgba(255,80,80,0.4))',
                tip: 'Color identity: the dominant hue of the light, around the color wheel (hue × 360°). Also tints the fog and background.',
            },
            {
                key: 'spectrum', ...unit,
                gradient: 'linear-gradient(to right, rgba(180,130,255,0.3), rgba(255,180,100,0.3), rgba(100,200,255,0.3))',
                tip: 'Color range: how much element colors vary around the dominant hue, from near-monochrome to fully prismatic.',
            },
            {
                key: 'chroma', ...unit,
                gradient: 'linear-gradient(to right, rgba(160,160,160,0.3), rgba(255,100,200,0.45))',
                tip: 'Color intensity: from nearly grayscale to fully vivid. At low chroma the fog is neutral; at high chroma it takes on the dominant hue.',
            },
        ],
    },
    {
        title: 'Space',
        description: 'The directional organization of forms: flow patterns and structural coherence.',
        section: 'controls',
        controls: [
            {
                key: 'coherence', ...unit,
                gradient: 'linear-gradient(to right, rgba(255,120,80,0.35), rgba(100,180,255,0.35))',
                tip: 'Organization: how strongly elements follow the flow pattern. At low coherence, elements orient randomly. At high coherence, they align into visible directional structure.',
            },
            {
                key: 'flow', ...unit,
                gradient: 'linear-gradient(to right, rgba(140,140,180,0.3), rgba(100,220,200,0.4))',
                tip: 'Spatial pattern: the shape of the directional field. At 0, a radial starburst. At 0.5, organic noise. At 1, orbital bands wrapping the form. Flow sets the shape; coherence sets its strength.',
            },
        ],
    },
    {
        title: 'Camera',
        description: 'The still eye of the scene: distance, orbit, and elevation.',
        section: 'camera',
        controls: [
            {
                key: 'zoom', min: -100, max: 100, step: 1,
                gradient: 'linear-gradient(to right, rgba(130,130,180,0.25), rgba(180,130,255,0.45))',
                tip: 'How close the viewpoint is. 0 is the default framing; 100 is 3× closer, −100 is 3× farther.',
            },
            {
                key: 'rotation', min: -180, max: 180, step: 1, suffix: '°',
                gradient: 'linear-gradient(to right, rgba(180,130,255,0.3), rgba(130,180,255,0.3), rgba(180,130,255,0.3))',
                tip: 'The horizontal orbit: a revolution around the forms, in degrees.',
            },
            {
                key: 'elevation', min: -90, max: 90, step: 1, suffix: '°',
                gradient: 'linear-gradient(to right, rgba(100,130,200,0.3), rgba(200,160,255,0.4))',
                tip: 'How far the gaze rises or descends, from beneath the forms to above them. 90° looks straight down.',
            },
        ],
    },
];
