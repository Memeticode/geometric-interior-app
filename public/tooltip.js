// A single shared tooltip, shown for any element with a data-tip attribute
// on hover or keyboard focus. It is fixed-positioned so the scrolling
// sidebar can't clip it. Screen readers get the same text through each
// control's aria-describedby, so this element is hidden from them.

const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
tooltip.setAttribute('aria-hidden', 'true');
document.body.append(tooltip);

let current = null;

function show(target) {
    current = target;
    tooltip.textContent = target.dataset.tip;
    tooltip.classList.add('visible');

    const gap = 8;
    const margin = 12;
    const anchor = target.getBoundingClientRect();
    const box = tooltip.getBoundingClientRect();
    let left = anchor.left + anchor.width / 2 - box.width / 2;
    left = Math.max(margin, Math.min(left, innerWidth - box.width - margin));
    let top = anchor.bottom + gap;
    if (top + box.height > innerHeight - margin) top = anchor.top - box.height - gap;
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
}

function hide() {
    current = null;
    tooltip.classList.remove('visible');
}

document.addEventListener('pointerover', e => {
    const target = e.target.closest?.('[data-tip]');
    if (target && target !== current) show(target);
});
document.addEventListener('pointerout', e => {
    if (current && !current.contains(e.relatedTarget)) hide();
});
document.addEventListener('focusin', e => {
    const target = e.target.closest?.('[data-tip]');
    if (target) show(target); else hide();
});
document.addEventListener('focusout', hide);
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') hide();
});
addEventListener('scroll', hide, true);
