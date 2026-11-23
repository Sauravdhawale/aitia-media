(() => {
  const root=document.documentElement;
  const system=matchMedia('(prefers-color-scheme: dark)');
  let preference='light';
  try{preference=localStorage.getItem('aitia-theme')||'light'}catch{}
  function applyTheme(value){preference=value;root.dataset.theme=value==='system'?(system.matches?'dark':'light'):value;document.querySelectorAll('[data-theme-choice]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.themeChoice===value)));const toggle=document.querySelector('.theme-toggle');if(toggle){toggle.textContent=root.dataset.theme==='dark'?'☀':'☾';toggle.setAttribute('aria-label',root.dataset.theme==='dark'?'Switch to light mode':'Switch to dark mode')}try{localStorage.setItem('aitia-theme',value)}catch{}}
  applyTheme(preference);
  system.addEventListener('change',()=>{if(preference==='system')applyTheme('system')});
  document.querySelector('.theme-toggle')?.addEventListener('click',()=>applyTheme(root.dataset.theme==='dark'?'light':'dark'));
  document.querySelectorAll('[data-theme-choice]').forEach(button=>button.addEventListener('click',()=>applyTheme(button.dataset.themeChoice)));
  const menu=document.querySelector('.mobile-menu'), menuButton=document.querySelector('.menu-toggle');
  function closeMenu(){menu?.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');menuButton?.setAttribute('aria-label','Open navigation menu');if(menuButton)menuButton.textContent='Menu'}
  menuButton?.addEventListener('click',()=>{const open=!menu.classList.contains('open');menu.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');menuButton.textContent=open?'Close':'Menu'});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.classList.contains('open')){closeMenu();menuButton.focus()}});
  document.addEventListener('click',e=>{if(!menu?.contains(e.target)&&!menuButton?.contains(e.target))closeMenu()});
  matchMedia('(min-width:681px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  const date=document.querySelector('[data-letter-date]');if(date)date.textContent=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.2 });
    document.querySelectorAll('.graphic').forEach(graphic => observer.observe(graphic));
  }
  const form=document.querySelector('#brief-form');
  if(form){const message=form.querySelector('[name=message]');const counter=form.querySelector('#message-count');message.addEventListener('input',()=>counter.textContent=String(message.value.length));const service=new URLSearchParams(location.search).get('service');if (service && service.length <= 60) {
      const options = [...form.querySelectorAll('[name=service]')];
      let option = options.find(input => input.value === service);
      if (!option) {
        const label = document.createElement('label');
        option = document.createElement('input');
        option.type = 'radio'; option.name = 'service'; option.value = service;
        const caption = document.createElement('span'); caption.textContent = service;
        label.append(option, caption); form.querySelector('.form-tags').append(label);
      }
      option.checked = true;
    }
    form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const text=`AITIA MEDIA — PROJECT BRIEF\n\nName: ${data.get('name')}\nWork email: ${data.get('email')}\nCompany: ${data.get('company')||'Not provided'}\nService: ${data.get('service')||'Let’s discuss'}\n\n${data.get('message')}`;const preview=document.querySelector('.draft-preview');const emailLink = document.querySelector('#email-brief');
    const recipient = emailLink.getAttribute('href').split('?')[0];
    emailLink.href = recipient + '?subject=' + encodeURIComponent('Project enquiry: ' + data.get('service')) + '&body=' + encodeURIComponent(text);
    preview.hidden=false;preview.querySelector('textarea').value=text;document.querySelector('#form-status').textContent='Your brief is ready. Open the email draft to review and send it.';document.querySelector('#copy-brief').onclick=async()=>{try{await navigator.clipboard.writeText(text);document.querySelector('#form-status').textContent='Brief copied. Paste it into an email or LinkedIn message.'}catch{const textarea=preview.querySelector('textarea');textarea.focus();textarea.select();document.querySelector('#form-status').textContent='Select and copy the brief below, then send it on LinkedIn.'}};preview.scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})
    });
  }
})();
