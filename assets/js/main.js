/**
* Template Name: Kelly
* Template URL: https://bootstrapmade.com/kelly-free-bootstrap-cv-resume-html-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links (anchor links)
   */
  document.querySelectorAll('#navmenu a[href^="#"]').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Single-page: update active nav link on scroll
   */
  const navLinks = document.querySelectorAll('#navmenu a[href^="#"]');
  if (navLinks.length > 0) {
    const sections = [];
    navLinks.forEach(link => {
      const id = link.getAttribute('href');
      if (id && id !== '#') {
        const el = document.querySelector(id);
        if (el) sections.push({ id, el, link });
      }
    });
    function updateActiveNav() {
      const scrollY = window.scrollY;
      let current = null;
      sections.forEach(({ el, link }) => {
        const top = el.offsetTop - 100;
        if (scrollY >= top) current = link;
      });
      navLinks.forEach(link => link.classList.remove('active'));
      if (current) current.classList.add('active');
    }
    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('load', updateActiveNav);
  }

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  (function () {
    ('[data-toggle="tooltip"]').tooltip();
  });  

  /**
   * Project flip cards: Details / Back toggles card flip (delegated so it works after Isotope)
   */
  document.body.addEventListener('click', function(e) {
    var btn = e.target.closest('.btn-flip');
    if (!btn) return;
    var card = btn.closest('.project-flip-card');
    if (!card) return;
    e.preventDefault();
    e.stopPropagation();
    card.classList.toggle('flipped');
  });

  /**
   * Experience cards: click to toggle expanded description (hover also expands)
   */
  document.body.addEventListener('click', function(e) {
    var card = e.target.closest('#experience .experience-card');
    if (!card) return;
    card.classList.toggle('expanded');
  });

  /**
   * Update project filter counts (e.g. "All (11)")
   */
  function updatePortfolioFilterCounts() {
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      var container = isotopeItem.querySelector('.isotope-container');
      if (!container) return;
      var items = container.querySelectorAll('.isotope-item');
      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(li) {
        var filterSel = li.getAttribute('data-filter');
        var countSpan = li.querySelector('.filter-count');
        if (!countSpan) return;
        var count;
        if (filterSel === '*') {
          count = items.length;
        } else {
          count = 0;
          for (var i = 0; i < items.length; i++) {
            if (items[i].matches(filterSel)) count++;
          }
        }
        countSpan.textContent = '(' + count + ')';
      });
    });
  }

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';
    let container = isotopeItem.querySelector('.isotope-container');

    updatePortfolioFilterCounts();

    let initIsotope;
    imagesLoaded(container, function() {
      initIsotope = new Isotope(container, {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
      updatePortfolioFilterCounts();
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  window.addEventListener('load', updatePortfolioFilterCounts);

})();