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
  return `<div class="brief-art" aria-hidden="true">
    <div class="account-list"><b>Account list</b>${['Industry','Company size','Buying team'].map(label=>`<span><i>✓</i>${label}</span>`).join('')}</div>
    <div class="brief-route"></div><div class="brief-cover"><small>AITIA MEDIA</small><strong>Sales<br><em>brief.</em></strong><i></i></div>
  </div>`;
}
function conveyor() {
  return `<div class="distribution" aria-hidden="true"><div class="mini-guide"><small>FIELD GUIDE</small><b>Buyer<br><em>insights.</em></b></div>
    <div class="branches"><i></i></div><div class="channels">${['Publisher','Email','Webinar'].map(name=>`<span>${name}</span>`).join('')}</div></div>`;
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
  return `<nav class="service-directory" aria-label="Explore B2B services">${services.map(([name,slug,shape])=>`<a href="${slug}.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${drawings[shape]}</svg><span>${name}</span><i aria-hidden="true">↗</i></a>`).join('')}</nav>`;
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
