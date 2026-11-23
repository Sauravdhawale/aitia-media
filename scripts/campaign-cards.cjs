const channels = {
  Strategy: ['Account research', 'Audience mapping', 'Positioning', 'Buying groups', 'Campaign planning', 'Segmentation'],
  Channels: ['LinkedIn', 'Email', 'Search', 'Publishers', 'Paid social', 'Webinars'],
  Creative: ['Whitepapers', 'Case studies', 'Landing pages', 'Brand identity', 'Editorial', 'Ad creative']
};
const cities = [
  ['Pune', 'Asia/Kolkata', 230, 83],
  ['London', 'Europe/London', 152, 43],
  ['New York', 'America/New_York', 88, 59]
];
const services = [
  ['B2B Lead Generation', 'b2b-lead-generation', 'people'],
  ['Demand Generation', 'demand-generation', 'spark'],
  ['Account Based Marketing', 'account-based-marketing', 'target'],
  ['Content Syndication', 'content-syndication', 'layers']
];
const drawings = {
  people: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-8 12-8 12 0m1-14c4 0 4 6 0 6m1 2q4 0 4 5"/>',
  spark: '<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  layers: '<path d="m2 8 10-5 10 5-10 5Zm0 5 10 5 10-5M2 18l10 5 10-5"/>'
};
function scene(viewBox, inside) {
  return `<svg class="scene" viewBox="${viewBox}" aria-hidden="true" fill="none" stroke-linejoin="round">${inside}</svg>`;
}
function sheet() {
  const ribbon = '<path class="paper" d="M45 143 164 78Q199 40 235 61L334 10 392 40 281 104Q237 82 206 120L103 176Z"/><path d="m66 142 39 22m-18-33 39 22m158-89 44-24m-35 29 44-24"/>';
  const bars = [20,40,66].map((height,i)=>{
    const x = 134 + i*30, y = 140 - i*15;
    return `<g class="column col-${i}" style="--delay:${-i*.38}s"><path class="paper" d="M${x} ${y}v-${height}l15-8 15 8v${height}l-15 8Z"/><path d="M${x} ${y-height}l15 8 15-8m-15 8v${height}"/></g>`;
  }).join('');
  return scene('0 0 430 190', `<g class="guides"><path d="m10 156 286-153M77 187 306 63M51 111l162 84M246 7l160 80"/></g><g class="sheet-scroll">${ribbon}${bars}</g>`);
}
function conveyor() {
  const packets = [0,1,2].map(i=>`<g class="packet" style="--delay:${-i*2}s;--rest:${i*60}px"><path class="paper" d="m36 82 17-10 17 10v22l-17 10-17-10Z"/><path d="m36 82 17 10 17-10m-17 10v22"/><path class="accent" d="m42 79 17 10 5-3-17-10Z"/></g>`).join('');
  return scene('0 0 300 150',`<g transform="rotate(6 150 75)"><path class="paper" d="m15 111 35-20h196l38 19-35 20H53Z"/><path d="m15 111 37 19h197l35-20v9l-35 20H52l-37-19Z"/>${packets}<path d="M142 119V59l29-16 34 17v49m-63-50 33 17 30-16m-30 16v58"/><path class="accent" d="m145 63 26-15 29 14" /></g>`);
}
function filterButton(name, attr, first) {
  return `<button type="button" ${attr}="${name}" aria-pressed="${first}">${name}</button>`;
}
function tracks() {
  const rows = Object.entries(channels).map(([group,names],i)=>{
    const chips = names.map(name=>`<span class="tool-chip"><i></i>${name}</span>`).join('');
    return `<div class="ticker" data-row="${group}"><div class="track" style="--direction:${i===1?'reverse':'normal'}"><div>${chips}</div><div aria-hidden="true">${chips}</div></div></div>`;
  }).join('');
  return `<div class="tracks">${rows}</div><div class="controls" aria-label="Filter capabilities">${['All',...Object.keys(channels)].map((n,i)=>filterButton(n,'data-filter',i===0)).join('')}</div>`;
}
function world() {
  const land = 'M12 48l20-17 29-8 27 5 18 16-6 12-20 6-9 19-13-3-8-19-22-1ZM76 87l25-3 15 14-4 19-17 26-9-26ZM129 45l24-16 14 4 12 13-6 13-20-2ZM144 66l22-5 21 12-4 24-17 22-15-12-9-25ZM171 42l37-23 51 5 29 20-14 14-20 5-13 18-11 12-10-18-22-6-13-14ZM236 96l17-1 13 13-16 2ZM253 119l22-13 17 9-1 13-26 6Z';
  const markers = cities.map(([name,zone,x,y],i)=>`<g data-pin="${name}" class="pin" style="${i?'display:none':''}" transform="translate(${x} ${y})"><circle class="ping" r="9"/><circle r="3" fill="var(--brand)"/></g>`).join('');
  return scene('0 0 300 150',`<defs><pattern id="atlas-dots" width="3.8" height="3.8" patternUnits="userSpaceOnUse"><circle cx="1.4" cy="1.4" r="1" fill="currentColor"/></pattern></defs><path d="${land}" stroke="none" fill="url(#atlas-dots)"/>${markers}`)+
    `<div class="clockline"><div class="controls">${cities.map(([n,z],i)=>`<button type="button" data-city="${n}" data-zone="${z}" aria-pressed="${i===0}">${n}</button>`).join('')}</div><time data-clock></time></div>`;
}
function dock() {
  return `<div class="dock-area"><p data-dock-label>B2B Lead Generation</p><div class="service-dock">${services.map(([name,slug,shape],i)=>`<button type="button" data-dock-item data-name="${name}" data-route="${slug}.html" aria-label="${name}" aria-pressed="${i===0}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${drawings[shape]}</svg></button>`).join('')}</div><a class="dock-open" href="b2b-lead-generation.html">Explore service</a></div>`;
}
module.exports = function campaignCards() {
  const panels = [
    ['Campaign planning','From audience research to qualified leads',sheet()],
    ['Capabilities','Explore the campaign toolkit',tracks()],
    ['Content syndication','How a resource reaches buyers',conveyor()],
    ['Market hours','Plan across time zones',world()],
    ['Services','Choose your campaign',dock()]
  ];
  return `<section class="campaign-grid" aria-label="How Aitia Media works">${panels.map(([label,title,art])=>`<article class="campaign-card"><div class="campaign-heading"><span>${label}</span><h3>${title}</h3></div>${art}</article>`).join('')}<button type="button" class="motion-control" aria-pressed="false">Pause motion</button></section>`;
};
