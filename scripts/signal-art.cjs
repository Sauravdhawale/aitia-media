// Perspective projection of parallel ribbons across an editorial dot grid.
module.exports = function signalArt() {
  const ribbons = [];
  for (let row = 0; row < 34; row++) {
    const coords = [];
    for (let col = 0; col <= 90; col++) {
      const u = col / 90, v = row / 33;
      const ridge = Math.exp(-Math.pow((u - 0.52 - 0.14 * Math.sin(v * 3.5)) / 0.18, 2));
      const x = 18 + u * 300 + v * 90;
      const y = 136 + v * 85 - u * 45 - ridge * (46 + v * 55);
      coords.push((col ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1));
    }
    ribbons.push('<path pathLength="1" class="' + (row % 7 === 0 ? 'signal-highlight' : 'signal-thread') + '" d="' + coords.join(' ') + '"/>');
  }
  return '<svg class="signal-art" viewBox="0 0 430 260" fill="none" aria-hidden="true"><g stroke="var(--border)" stroke-dasharray="2 6"><path d="M12 130h405M16 190h395M70 36v190M351 32v195"/></g>' + ribbons.join('') + '</svg>';
};
