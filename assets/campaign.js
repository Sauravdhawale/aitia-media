(() => {
  const grid = document.querySelector('.campaign-grid');
  if (!grid) return;
  function select(button, selector) {
    grid.querySelectorAll(selector).forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  }
  grid.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      select(button, '[data-filter]');
      grid.querySelectorAll('[data-row]').forEach(row => {
        row.hidden = button.dataset.filter !== 'All' && button.dataset.filter !== row.dataset.row;
      });
    });
  });
  let zone = grid.querySelector('[data-zone]').dataset.zone;
  function updateClock() {
    const now = new Date();
    const clock = grid.querySelector('[data-clock]');
    clock.dateTime = now.toISOString();
    clock.textContent = new Intl.DateTimeFormat('en-GB', {timeZone:zone,hour:'2-digit',minute:'2-digit'}).format(now);
  }
  grid.querySelectorAll('[data-city]').forEach(button => {
    button.addEventListener('click', () => {
      select(button, '[data-city]');
      grid.querySelectorAll('[data-pin]').forEach(pin => {
        pin.style.display = pin.dataset.pin === button.dataset.city ? '' : 'none';
      });
      zone = button.dataset.zone;
      updateClock();
    });
  });
  updateClock();
  setInterval(updateClock, 30000);
  const pause = grid.querySelector('.motion-control');
  pause.addEventListener('click', () => {
    const paused = grid.toggleAttribute('data-paused');
    pause.setAttribute('aria-pressed',String(paused));
    pause.textContent = paused ? 'Resume motion' : 'Pause motion';
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      grid.toggleAttribute('data-offscreen', !entry.isIntersecting);
    }).observe(grid);
  }
})();
