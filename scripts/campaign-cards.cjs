const channels = {
  Strategy: ['Account research', 'Audience mapping', 'Positioning', 'Buying groups', 'Campaign planning', 'Segmentation'],
  Channels: ['LinkedIn', 'Email', 'Search', 'Publishers', 'Paid social', 'Webinars'],
  Creative: ['Whitepapers', 'Case studies', 'Landing pages', 'Brand identity', 'Editorial', 'Ad creative']
};
const cities = [
  ['Pune', 'Asia/Kolkata', 211.55, 68.21],
  ['London', 'Europe/London', 149.89, 33.84],
  ['New York', 'America/New_York', 88.33, 45.09]
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
  const pages = [0,1,2].map(i => `<g class="packet" style="--delay:${-i * 2}s;--rest:${i * 60}px">
    <path class="paper" d="m36 78 22-12 14 8v28l-22 13-14-9Z"/>
    <path d="m36 78 14 8 22-12m-22 12v29"/><path class="accent" d="m54 92 12-7m-12 13 9-5"/>
  </g>`).join('');
  const rollers = Array.from({length:14}, (_,i) => `<path d="m${30+i*16} 108 20-12"/>`).join('');
  return scene('0 0 300 150', `<path class="paper" d="m12 108 25-15h226l25 16-25 15H38Z"/>
    <g opacity=".32">${rollers}</g><path d="m12 108 26 16h225l25-15v5l-25 16H38l-26-16Z"/>
    ${pages}<path class="accent" d="M170 113V68l20-11 17 10v33" stroke-dasharray="3 3"/>`);

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
  const markers = cities.map(([name,zone,x,y],i)=>`<g data-pin="${name}" class="pin" style="${i?'display:none':''}" transform="translate(${x} ${y})"><circle class="ping" r="9"/><circle r="3" fill="var(--brand)"/></g>`).join('');
  return scene('0 0 300 150',`<image href="assets/market-map.svg" width="300" height="150"/>${markers}`)+
    `<div class="clockline"><div class="controls">${cities.map(([n,z],i)=>`<button type="button" data-city="${n}" data-zone="${z}" aria-pressed="${i===0}">${n}</button>`).join('')}</div><time data-clock></time></div>`;
}
function dock() {
  return `<div class="dock-area"><p data-dock-label>B2B Lead Generation</p><div class="service-dock">${services.map(([name,slug,shape],i)=>`<button type="button" data-dock-item data-name="${name}" data-route="${slug}.html" aria-label="${name}" aria-pressed="${i===0}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${drawings[shape]}</svg></button>`).join('')}</div><a class="dock-open" href="b2b-lead-generation.html">Explore service</a></div>`;
}
module.exports = function campaignCards() {
  const panels = [
    ['Campaign planning','From account list to sales brief',sheet()],
    ['Capabilities','Find the right channel',tracks()],
    ['Content syndication','A guide, delivered to its readers',conveyor()],
    ['Market hours','Plan across time zones',world()],
    ['Services','Explore B2B services',dock()]
  ];
  return `<section class="campaign-grid" aria-label="How Aitia Media works">${panels.map(([label,title,art])=>`<article class="campaign-card"><div class="campaign-heading"><span>${label}</span><h3>${title}</h3></div>${art}</article>`).join('')}<button type="button" class="motion-control" aria-pressed="false">Pause motion</button></section>`;
};
