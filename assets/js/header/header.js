const toggleNavMobile = () => {
  let navMobile = document.querySelector('nav > #nav');
  let iconMenu = document.querySelector('nav > #toggle-nav');
  navMobile.classList.toggle('mobile');
  console.log(iconMenu);
  iconMenu.setAttribute('class', navMobile.classList.contains('mobile') ? 'fab fa-gitter' : 'fab fa-buromobelexperte');
};

const closeMenu = () => {
  let navMobile = document.querySelector('nav > #nav');
  let iconMenu = document.querySelector('nav > #toggle-nav');
  navMobile.classList.remove('mobile');
  iconMenu.setAttribute('class', navMobile.classList.contains('mobile') ? 'fab fa-gitter' : 'fab fa-buromobelexperte');
};

function initMobileMenu() {
  if (window.matchMedia('(max-width: 768px)').matches) {
    window.addEventListener('resize', initMobileMenu);
    let toggleNav = document.querySelector('#toggle-nav');
    toggleNav.style.cursor = 'pointer';
    toggleNav.addEventListener('click', toggleNavMobile);
    let main = document.querySelector('main');
    main.addEventListener('click', closeMenu);
    let navLinks = document.querySelectorAll('nav > #nav > ul > li > a');
    navLinks.forEach((navLink) => {
      navLink.addEventListener('click', closeMenu);
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  window.addEventListener('resize', initMobileMenu);
  window.addEventListener('resize', closeMenu);
  window.addEventListener('scroll', closeMenu);
});
