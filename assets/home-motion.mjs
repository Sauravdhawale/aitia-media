import { animate } from './motion-mini.mjs';

const grid = document.querySelector('.campaign-grid');
const preference = matchMedia('(prefers-reduced-motion: reduce)');
const running = new Map();

function finishAnimations() {
  for (const animation of running.values()) animation.complete();
  running.clear();
}

function enter(element, distance, duration, delay = 0) {
  if (!element || preference.matches || grid.hasAttribute('data-paused')) return;
  running.get(element)?.complete();
  const animation = animate(element, {
    translate: [distance, '0px 0px'],
    opacity: [0.65, 1]
  }, {duration, delay, ease:[0.22, 1, 0.36, 1]});
  running.set(element, animation);
  animation.then(() => {
    if (running.get(element) === animation) running.delete(element);
  });
}

if (grid && typeof Element.prototype.animate === 'function') {
  enter(document.querySelector('.research-sheet'), '-14px 9px', 0.52);
  enter(document.querySelector('.guide-sheet'), '12px 14px', 0.6, 0.06);
  enter(document.querySelector('.print-ticket'), '0px 10px', 0.4, 0.14);

  const dock = grid.querySelector('.service-dock');
  let previous = dock.querySelector('[aria-pressed="true"]');
  new MutationObserver(() => {
    const selected = dock.querySelector('[aria-pressed="true"]');
    if (selected === previous) return;
    previous = selected;
    enter(selected?.querySelector('svg'), '0px 4px', 0.24);
    enter(grid.querySelector('[data-dock-label]'), '0px 3px', 0.2);
  }).observe(dock, {subtree:true, attributes:true, attributeFilter:['aria-pressed']});

  preference.addEventListener('change', () => {
    if (preference.matches) finishAnimations();
  });
  new MutationObserver(() => {
    if (grid.hasAttribute('data-paused')) finishAnimations();
  }).observe(grid, {attributes:true, attributeFilter:['data-paused']});
}
