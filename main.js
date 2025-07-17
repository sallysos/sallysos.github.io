document.addEventListener('DOMContentLoaded', () => {
  // load html file and inject to placeholder
  function loadPartial(url, placeholderId) {
    return fetch(url)
      .then(res => res.text())
      .then(html => { document.getElementById(placeholderId).innerHTML = html; });
  }

  // load header & footer
  Promise.all([
    loadPartial('header.html', 'header-placeholder'),
    loadPartial('footer.html', 'footer-placeholder')
  ]).then(() => {
          
    // highlight current nav link
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar nav a').forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref === current) {
        link.classList.add('active-nav');
      } else {
        link.classList.remove('active-nav'); 
      }
    });
    const navbar   = document.querySelector('.navbar');
    const openBtn = document.querySelector('.open-menu');
    const closeBtn  = document.querySelector('.close-menu');
    const overlay   = document.getElementById('overlayNav');
 
    function openMenu() {
      navbar.classList.add('menu-open');
      overlay.classList.add('show');
    }
    function closeMenu() {
      console.log('closeMenu fired');
      overlay.classList.remove('show');
      navbar.classList.remove('menu-open');
    }
    // open mobile menu
    openBtn.addEventListener('click', openMenu);
    // close mobile menu
    closeBtn.addEventListener('click', closeMenu);
    overlay.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', closeMenu)
    );

    // filter function in projects //
    const filterLinks = document.querySelectorAll('.filters a');
    const thumbnails  = document.querySelectorAll('.thumbnail');

    filterLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        // toggle active state
        filterLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        const tag = link.dataset.tag; 
        thumbnails.forEach(card => {
          const tags = (card.dataset.tags || '').split(' ');
          const show = tag === 'all' || tags.includes(tag);
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }).catch(err => console.error('Error loading header or footer:', err));
});