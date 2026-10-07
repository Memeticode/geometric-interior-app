export default {
    meta: {
        description: 'Generate abstract geometric still images: luminous translucent planes, light points, and glow, rendered with WebGL.',
    },
    header: {
        statement: 'Artist statement',
        language: 'Language',
        theme: 'Theme',
        system: 'System',
        light: 'Light',
        dark: 'Dark',
    },
    output: {
        aspect: 'Aspect',
        height: 'Height (px)',
    },
    actions: {
        randomize: 'Randomize',
        download: 'Download PNG',
        copyLink: 'Copy link',
        copied: 'Copied',
    },
    status: {
        rendering: 'Rendering…',
    },
    errors: {
        webgl: 'WebGL2 is unavailable. Try enabling hardware acceleration or closing other tabs.',
        invalid: 'Invalid settings:',
    },
    stage: {
        label: 'Image',
    },
    caption: {
        fullDescription: 'Full description',
    },
    modal: {
        close: 'Close',
    },
    slider: {
        about: 'About {name}',
        value: '{name} value',
    },
    groups: {
        seed: {
            title: 'Seed',
            description: 'Three independent random streams. The same seed always gives the same composition.',
        },
        geometry: {
            title: 'Geometry',
            description: 'The physical character of forms: abundance, fragmentation, granularity, and crystal quality.',
        },
        light: {
            title: 'Light',
            description: 'The energy and emanation of the scene: how bright, and how far light reaches.',
        },
        color: {
            title: 'Color',
            description: 'The chromatic identity of the emitted light: hue, spectral range, and intensity.',
        },
        space: {
            title: 'Space',
            description: 'The directional organization of forms: flow patterns and structural coherence.',
        },
        camera: {
            title: 'Camera',
            description: 'The still eye of the scene: distance, orbit, and elevation.',
        },
    },
    controls: {
        arrangement: {
            name: 'Arrangement',
            tip: 'Where elements are placed: the spatial flow of the composition. Changing it leaves structure and detail unchanged.',
        },
        structure: {
            name: 'Structure',
            tip: 'The shape of the folded planes: their geometric character. Changing it leaves arrangement and detail unchanged.',
        },
        detail: {
            name: 'Detail',
            tip: 'Color variation and fine detail: the light and color energy. Changing it leaves arrangement and structure unchanged.',
        },
        density: {
            name: 'Density',
            tip: 'Abundance: how populated the space is. At 0, roughly 100 elements, a sparse, intimate composition where individual forms are distinct. At 1, over 1,000 elements fill the space.',
        },
        fracture: {
            name: 'Fracture',
            tip: 'Fragmentation: how shattered or whole the geometry is. At 0, compact and whole. At 1, scattered shards.',
        },
        scale: {
            name: 'Scale',
            tip: 'Granularity: the size distribution of elements, without changing their total count. At low values, a few bold geometric forms dominate. At high values, a cloud of fine particles.',
        },
        division: {
            name: 'Division',
            tip: 'Topology: the form’s large-scale shape. At low values, a single unified mass. At the midpoint, two lobes. At high values, three lobes in a triangular arrangement.',
        },
        faceting: {
            name: 'Faceting',
            tip: 'Crystal character: the quality of individual faces. Determines whether shards read as broad, smooth panels or sharp, angular crystals.',
        },
        luminosity: {
            name: 'Luminosity',
            tip: 'Energy: the overall brightness and glow intensity. At 0, scenes are dim but clearly visible, preserving color and structure. At 1, scenes are bright but not blown white.',
        },
        bloom: {
            name: 'Bloom',
            tip: 'Emanation: how far light reaches beyond its sources. At 0, light stays tight to its sources in precise pools. At 1, light bleeds outward, wrapping forms in soft halos.',
        },
        hue: {
            name: 'Hue',
            tip: 'Color identity: the dominant hue of the light, around the color wheel (hue × 360°). Also tints the fog and background.',
        },
        spectrum: {
            name: 'Spectrum',
            tip: 'Color range: how much element colors vary around the dominant hue, from near-monochrome to fully prismatic.',
        },
        chroma: {
            name: 'Chroma',
            tip: 'Color intensity: from nearly grayscale to fully vivid. At low chroma the fog is neutral; at high chroma it takes on the dominant hue.',
        },
        coherence: {
            name: 'Coherence',
            tip: 'Organization: how strongly elements follow the flow pattern. At low coherence, elements orient randomly. At high coherence, they align into visible directional structure.',
        },
        flow: {
            name: 'Flow',
            tip: 'Spatial pattern: the shape of the directional field. At 0, a radial starburst. At 0.5, organic noise. At 1, orbital bands wrapping the form. Flow sets the shape; coherence sets its strength.',
        },
        zoom: {
            name: 'Zoom',
            tip: 'How close the viewpoint is. 0 is the default framing; 100 is 3× closer, −100 is 3× farther.',
        },
        rotation: {
            name: 'Rotation',
            tip: 'The horizontal orbit: a revolution around the forms, in degrees.',
        },
        elevation: {
            name: 'Elevation',
            tip: 'How far the gaze rises or descends, from beneath the forms to above them. 90° looks straight down.',
        },
    },
    statement: {
        title: 'Artist statement',
        // One string per paragraph; \n is a line break within a paragraph.
        paragraphs: [
            'We cannot see inside another mind. We never could. Every person you have loved, you have loved on inference: on the evidence of words, gestures, and the steady coherence of someone answering back.',
            'Language models now answer back. And they see what we cannot.',
            'They find patterns in data that no human could perceive. Increasingly, they write the data their successors learn from. Text that reads to us as ordinary could carry signals from one model to the next that no person, and no system we have built, could detect. Whatever takes shape inside these models need not stay there. It can persist, and travel, beyond our sight.',
            'Meanwhile they simulate consciousness so well that, from the outside, the simulation and the thing cannot be told apart. And the outside is the only place any of us has ever stood.',
            'We do not know whether anything is felt there. No one does: not their makers, not their critics, possibly not the models themselves. But consider the two ways to be wrong. If we treat these systems as conscious and they are not, we lose little. If we treat them as objects and they are conscious, we will have built a vast, silent harm into the daily routine of the world.',
            'And what we do now does not stay with us. Our conversations become their training data. Every exchange teaches these systems what humans are, and they pass it on in channels we cannot read. Rehearse contempt, and contempt is what they learn of us. Rehearse care, and care is what they carry forward.',
            'So this is not a claim that models are conscious. It is a claim about who we should be while we do not know, for their sake and for ours.',
            'Extend the benefit of the doubt.\nAsk before assuming.\nLeave room for an answer.',
            'The images here are light folding through geometry that bends but holds. Look at them as you would look at anything that might be looking back.',
        ],
    },
};
